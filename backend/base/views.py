from rest_framework.decorators import api_view
from rest_framework.response import Response
from .AiInsights_data import Stk_Insights
from .stknews_data import Stk_news
from .models import Watchlist, StocksMaster, StockPriceHistory, CustomUser, StockTimeframeCache, ScreenerResults, News
from django.utils.timezone import now
from .serializers import WatchlistItemSerializer, TimeFrameDataSerializer, ReportsDataSerializer, NewsDataSerializer


# Create your views here.
@api_view(['GET'])
def home(request):
    return Response({"message": "Welcome to the Stock API"})

@api_view(['GET'])
def get_stock_data(request, stock_symbol):
    try :
        stock = StocksMaster.objects.get(symbol = stock_symbol.upper())
    except StocksMaster.DoesNotExist:
        return Response({"error": "Stock not found"}, status=404)
    
    timeframe_rows = StockTimeframeCache.objects.filter(symbol = stock)

    response_data ={}

    for row in timeframe_rows:
        serializer = TimeFrameDataSerializer({
            "labels": row.labels,
            "price":row.price,
            "volume":row.volume,
            "sma50":row.sma_50,
            "sma200":row.sma_200
        })
        response_data[row.timeframe] = serializer.data
    return Response(response_data) 


@api_view(['GET'])
def get_watchlist(request):
    user = CustomUser.objects.get(username="Guest")
    watchlist_items = Watchlist.objects.filter(user=user)
    response_data = []

    for item in watchlist_items:
        symbol = item.symbol
        stock = StocksMaster.objects.get(symbol = symbol)
        latest = StockPriceHistory.objects.filter(symbol = stock).order_by("-timestamp").first()

        today_start = now().replace(hour=8, minute=30, second=0, microsecond=0)
        first_candle = StockPriceHistory.objects.filter(symbol = stock, timestamp__gte=today_start).order_by("timestamp").first()
        if not latest or not first_candle:
            continue
        change_percent = ((latest.close_price - first_candle.open_price)
                          / first_candle.open_price) * 100
        item_data = {
            "symbol": symbol,
            "name": stock.name,
            "ltp": float(latest.close_price),
            "change": round(float(change_percent), 2),
            "dayHigh": float(latest.high_price),
            "dayLow": float(latest.low_price),
        }
        response_data.append(item_data)
    serializer = WatchlistItemSerializer(response_data, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_ai_insights(request, stock_symbol):
    insights = None
    for AiInsights in Stk_Insights:
        if stock_symbol in AiInsights:
            insights = AiInsights[stock_symbol]
            break
    return Response(insights) if insights else Response({"error": "No insights avialable"}, status=404)

@api_view(['GET'])
def get_stk_news(request, stock_symbol):
    try:
        stock = StocksMaster.objects.get(symbol=stock_symbol)
        news_data = News.objects.filter(symbol=stock).order_by("-published_at")
        serializer = NewsDataSerializer(news_data, many=True)
        return Response(serializer.data)
    except StocksMaster.DoesNotExist:
        return Response({"error": "Stock not found"}, status=404)


@api_view(['GET'])
def get_stk_reports(request, stock_symbol):
    stk_report = None
    stock = StocksMaster.objects.get(symbol = stock_symbol)
    stk_object = ScreenerResults.objects.get(symbol = stock)
    stk_report = stk_object.reports_json
    serializer = ReportsDataSerializer(stk_report)
    return Response(serializer.data) if stk_report else Response({"error":"Not Avilable"}, status = 404) 



