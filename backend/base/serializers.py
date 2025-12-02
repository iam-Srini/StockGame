from rest_framework import serializers
from .models import Watchlist, StocksMaster, StockPriceHistory
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