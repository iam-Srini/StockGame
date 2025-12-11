from rest_framework import serializers
from .models import News, Insights, Holdings, StockPriceHistory,StocksMaster, CustomUser, UserPreferences, ScreenerResults
from django.utils.timezone import now


class WatchlistItemSerializer(serializers.Serializer):
    symbol = serializers.CharField()
    name = serializers.CharField()
    ltp = serializers.FloatField()
    change = serializers.FloatField()
    dayHigh = serializers.FloatField()
    dayLow = serializers.FloatField()


class TimeFrameDataSerializer(serializers.Serializer):
    labels = serializers.ListField()
    price = serializers.ListField()
    volume = serializers.ListField()
    sma50 = serializers.ListField(required = False)
    sma200 = serializers.ListField(required = False)


class ReportsDataSerializer(serializers.Serializer):
    pe = serializers.CharField()
    eps = serializers.DecimalField(max_digits=12,decimal_places=2)
    revenue = serializers.CharField()
    profitMargin = serializers.CharField()
    dividendYield = serializers.CharField()
    week52High = serializers.DecimalField(max_digits=12, decimal_places=2)
    week52Low =  serializers.DecimalField(max_digits=12,decimal_places=2)

class NewsDataSerializer(serializers.ModelSerializer):
    time = serializers.SerializerMethodField()

    class Meta:
        model = News
        fields = ["headline", "source", "time"]

    def get_time(self, obj):
        return obj.published_at.strftime("%Y-%m-%d %H:%M:%S")
    
class AiInsightsDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = Insights
        fields = ["ai_insights"]

class ChangePercentSerializer(serializers.Serializer):
    symbol = serializers.CharField()
    change_percent = serializers.CharField()

class HoldingsSerializer(serializers.ModelSerializer):
    current_price = serializers.SerializerMethodField()
    previous_close = serializers.SerializerMethodField()
    today_pl_percent = serializers.SerializerMethodField()
    total_pl = serializers.SerializerMethodField()

    class Meta:
        model = Holdings
        fields = "__all__"

    # Utility: get StocksMaster object once
    def get_stock_master(self, obj):
        return StocksMaster.objects.get(symbol=obj.symbol)

    # LTP
    def get_current_price(self, obj):
        stock = self.get_stock_master(obj)
        latest = (
            StockPriceHistory.objects.filter(symbol=stock)
            .order_by("-timestamp")
            .first()
        )
        return latest.close_price if latest else None

    # Previous Close
    def get_previous_close(self, obj):
        stock = self.get_stock_master(obj)
        rows = (
            StockPriceHistory.objects.filter(symbol=stock)
            .order_by("-timestamp")[:2]
        )
        return rows[1].close_price if len(rows) == 2 else None

    # Today PL%
    def get_today_pl_percent(self, obj):
        latest = self.get_current_price(obj)
        prev = self.get_previous_close(obj)
        if latest is None or prev is None:
            return None
        return ((latest - prev) / prev) * 100

    # Total PL
    def get_total_pl(self, obj):
        latest = self.get_current_price(obj)
        if latest is None:
            return None
        invested = float(obj.quantity) * float(obj.avg_buy_price)
        current = float(latest) * float(obj.quantity)
        return current - invested


class ProfileSerializer(serializers.ModelSerializer):
    currency = serializers.SerializerMethodField()
    timezone = serializers.SerializerMethodField()
    darkmode = serializers.SerializerMethodField()
    notifications = serializers.SerializerMethodField()
    class Meta:
        model = CustomUser
        fields = ["first_name", "email", "phone", "username", "joined_at",
                  "currency", "timezone", "darkmode", "notifications"]
    
    def get_currency(self, obj):
        prefs = UserPreferences.objects.get(user = obj)
        return prefs.currency
    
    def get_timezone(self, obj):
        prefs = UserPreferences.objects.get(user = obj)
        return prefs.timezone
    
    def get_darkmode(self, obj):
        prefs = UserPreferences.objects.get(user = obj)
        return prefs.dark_mode
    
    def get_notifications(self, obj):
        prefs = UserPreferences.objects.get(user = obj)
        return prefs.notifications_enabled
    
class ScreenerResultSerializer(serializers.ModelSerializer):
    symbol = serializers.CharField(source="symbol.symbol") 
    class Meta:
        model = ScreenerResults
        fields = [
            "symbol",
            "name",
            "sector",
            "price",
            "change_percent",
            "volume",
            "market_cap",
            "pe_ratio",
            "week52_high",
            "week52_low",
            "reports_json",
            "updated_at",
        ]
    


    

    

    
