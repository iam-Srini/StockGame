from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=20, blank=True, null=True)
    joined_at = models.DateTimeField(auto_now_add=True)

    first_name = None
    last_name = None

    REQUIRED_FIELDS = ["email"]


class UserPreferences(models.Model):
    user = models.OneToOneField(CustomUser,on_delete=models.CASCADE)
    currency = models.CharField(max_length=10, default="USD")
    timezone = models.CharField(max_length=50, default="UTC")
    dark_mode = models.BooleanField(default=False)
    notifications_enabled = models.BooleanField(default=True)


class Watchlist(models.Model):
    user = models.ForeignKey(CustomUser,on_delete=models.CASCADE)
    symbol = models.CharField(max_length=20)
    added_at = models.DateTimeField(auto_now_add=True)


class Holdings(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    symbol = models.CharField(max_length=20)
    quantity = models.DecimalField(max_digits=12, decimal_places=2)
    amount_invested = models.DecimalField(max_digits=12, decimal_places=2)
    avg_buy_price = models.DecimalField(max_digits=12, decimal_places=2)
    current_value = models.DecimalField(max_digits=12, decimal_places=2)
    transaction_date = models.DateTimeField()
    is_active = models.BooleanField(default=True)


class Transactions(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    symbol = models.CharField(max_length=20)
    quantity = models.DecimalField(max_digits=12, decimal_places=2)
    price = models.DecimalField(max_digits=12, decimal_places=2)
    transaction_type = models.CharField(max_length=20)
    executed_at = models.DateTimeField(auto_now_add=True)

