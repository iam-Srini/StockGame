from rest_framework.decorators import api_view
from rest_framework.response import Response
from .stockdata import Stk_data
from .watchlist import watchlist
from .AiInsights_data import Stk_Insights
from .stknews_data import Stk_news
from .stkReports_data import Reports_Data


# Create your views here.
@api_view(['GET'])
def home(request):
    return Response(Stk_data)

@api_view(['GET'])
def get_stock_data(request, stock_symbol):
    stock = None
    for stock_entry in Stk_data:
        if stock_symbol in stock_entry:
            stock = stock_entry[stock_symbol]
            break
    return Response(stock) if stock else Response({"error": "Stock not found"}, status=404)

@api_view(['GET'])
def get_watchlist(request):
    return Response(watchlist)

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
    stknews = None
    for news in Stk_news:
        if stock_symbol in news:
            stknews = news[stock_symbol]
            break 
    return Response(stknews) if news else Response({"error":"No Updates rightnow"}, status= 404)

@api_view(['GET'])
def get_stk_reports(request, stock_symbol):
    stk_report = None
    for report in Reports_Data:
        if stock_symbol in report:
            stk_report = report[stock_symbol]
            break
    return Response(stk_report) if stk_report else Response({"error":"Not Avilable"}, status = 404) 



