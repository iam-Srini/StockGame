from rest_framework import serializers
from .models import News
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
