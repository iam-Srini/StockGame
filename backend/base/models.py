from django.db import models
from django.contrib.auth.models import AbstractUser


class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=20, blank=True, null=True)
    joined_at = models.DateTimeField(auto_now_add=True)

    first_name = None
    last_name = None

    REQUIRED_FIELDS = ["email"]

    def __str__(self):
        return self.username

    def __repr__(self):
        return f"<CustomUser id={self.id} username={self.username}>"


class UserPreferences(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    currency = models.CharField(max_length=10, default="USD")
    timezone = models.CharField(max_length=50, default="UTC")
    dark_mode = models.BooleanField(default=False)
    notifications_enabled = models.BooleanField(default=True)

    def __str__(self):
        return f"Preferences({self.user.username})"

    def __repr__(self):
        return f"<UserPreferences user_id={self.user_id} currency={self.currency}>"


class Watchlist(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    symbol = models.CharField(max_length=20)
    added_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} → {self.symbol}"

    def __repr__(self):
        return f"<Watchlist id={self.id} user_id={self.user_id} symbol={self.symbol}>"


class Holdings(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    symbol = models.CharField(max_length=20)

    quantity = models.DecimalField(max_digits=12, decimal_places=4)
    avg_buy_price = models.DecimalField(max_digits=12, decimal_places=2)
    total_cost_basis = models.DecimalField(max_digits=12, decimal_places=2)
    current_value = models.DecimalField(max_digits=12, decimal_places=2)

    is_active = models.BooleanField(default=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.username} holding {self.symbol}"

    def __repr__(self):
        return (f"<Holdings id={self.id} user_id={self.user_id} "
                f"symbol={self.symbol} qty={self.quantity}>")


class Transactions(models.Model):

    TRANSACTION_TYPES = [
        ("BUY", "Buy"),
        ("SELL", "Sell"),
    ]

    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    symbol = models.CharField(max_length=20)

    quantity = models.DecimalField(max_digits=12, decimal_places=4)
    price = models.DecimalField(max_digits=12, decimal_places=2)

    transaction_type = models.CharField(max_length=10, choices=TRANSACTION_TYPES)
    executed_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.transaction_type} {self.quantity} {self.symbol}"

    def __repr__(self):
        return (f"<Transaction id={self.id} user_id={self.user_id} "
                f"type={self.transaction_type} symbol={self.symbol}>")


class StocksMaster(models.Model):
    symbol = models.CharField(max_length=20, unique=True)
    name = models.CharField(max_length=100)
    sector = models.CharField(max_length=100, blank=True, null=True)
    industry = models.CharField(max_length=100, blank=True, null=True)
    exchange = models.CharField(max_length=50, blank=True, null=True)

    market_cap = models.BigIntegerField(blank=True, null=True)
    pe_ratio = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    logo_url = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.symbol

    def __repr__(self):
        return f"<StocksMaster symbol={self.symbol} sector={self.sector}>"


class StockPriceHistory(models.Model):
    symbol = models.ForeignKey(StocksMaster, on_delete=models.CASCADE)
    timestamp = models.DateTimeField()

    open_price = models.DecimalField(max_digits=12, decimal_places=4)
    high_price = models.DecimalField(max_digits=12, decimal_places=4)
    low_price = models.DecimalField(max_digits=12, decimal_places=4)
    close_price = models.DecimalField(max_digits=12, decimal_places=4)
    volume = models.BigIntegerField()

    sma_50 = models.DecimalField(max_digits=12, decimal_places=4, blank=True, null=True)
    sma_200 = models.DecimalField(max_digits=12, decimal_places=4, blank=True, null=True)

    class Meta:
        indexes = [models.Index(fields=["symbol", "timestamp"])]

    def __str__(self):
        return f"{self.symbol.symbol} @ {self.timestamp}"

    def __repr__(self):
        return (f"<StockPriceHistory symbol={self.symbol.symbol} "
                f"timestamp={self.timestamp}>")

class StockTimeframeCache(models.Model):
    TIMEFRAMES = [
        ("1D", "1 Day"),
        ("1W", "1 Week"),
        ("1M", "1 Month"),
        ("3M", "3 Months"),
        ("6M", "6 Months"),
        ("1Y", "1 Year"),
        ("5Y", "5 Years"),
    ]

    symbol = models.ForeignKey(StocksMaster, on_delete=models.CASCADE)
    timeframe = models.CharField(max_length=5, choices=TIMEFRAMES)

    labels = models.JSONField()
    price = models.JSONField()
    volume = models.JSONField()
    sma_50 = models.JSONField(blank=True, null=True)
    sma_200 = models.JSONField(blank=True, null=True)

    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ("symbol", "timeframe")

    def __str__(self):
        return f"{self.symbol.symbol} - {self.timeframe}"

    def __repr__(self):
        return f"<TimeframeCache symbol={self.symbol.symbol} tf={self.timeframe}>"


class News(models.Model):
    symbol = models.ForeignKey(StocksMaster, on_delete=models.CASCADE)
    source = models.CharField(max_length=100)
    headline = models.TextField()
    url = models.TextField()
    published_at = models.DateTimeField()

    def __str__(self):
        return f"News for {self.symbol.symbol}"

    def __repr__(self):
        return f"<News symbol={self.symbol.symbol} source={self.source}>"


class Insights(models.Model):
    symbol = models.ForeignKey(StocksMaster, on_delete=models.CASCADE)
    date = models.DateField()
    ai_insights = models.TextField()
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-date"]

    def __str__(self):
        return f"Insight({self.symbol.symbol} - {self.date})"

    def __repr__(self):
        return f"<Insights symbol={self.symbol.symbol} date={self.date}>"


class ScreenerResults(models.Model):
    symbol = models.ForeignKey(StocksMaster, on_delete=models.CASCADE)

    name = models.CharField(max_length=100)
    sector = models.CharField(max_length=100, blank=True, null=True)

    price = models.DecimalField(max_digits=12, decimal_places=4)
    change_percent = models.DecimalField(max_digits=6, decimal_places=2)
    volume = models.BigIntegerField()

    market_cap = models.BigIntegerField(blank=True, null=True)
    pe_ratio = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)

    week52_high = models.DecimalField(max_digits=12, decimal_places=4)
    week52_low = models.DecimalField(max_digits=12, decimal_places=4)

    reports_json = models.JSONField(blank=True, null=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Screener: {self.symbol.symbol}"

    def __repr__(self):
        return f"<ScreenerResults symbol={self.symbol.symbol}>"
