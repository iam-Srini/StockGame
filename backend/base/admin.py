from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser, UserPreferences, Watchlist, Holdings, Transactions
from .models import StocksMaster, StockPriceHistory, StockTimeframeCache, News, Insights, ScreenerResults


class CustomUserAdmin(UserAdmin):
    model = CustomUser

    # Fields shown in the list page
    list_display = ("id", "username", "email", "phone", "is_staff", "is_active", "joined_at")
    list_filter = ("is_staff", "is_active")

    # Fields shown when opening a user in admin
    fieldsets = (
        (None, {"fields": ("username", "email", "password")}),
        ("Personal Info", {"fields": ("phone", "joined_at")}),
        ("Permissions", {"fields": ("is_active", "is_staff", "is_superuser", "groups", "user_permissions")}),
    )

    # Fields used when adding a user via admin
    add_fieldsets = (
        (None, {
            "classes": ("wide",),
            "fields": ("username", "email", "phone", "password1", "password2", "is_staff", "is_active"),
        }),
    )

    search_fields = ("username", "email")
    ordering = ("id",)


admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(UserPreferences)
admin.site.register(Watchlist)
admin.site.register(Holdings)
admin.site.register(Transactions)

admin.site.register(StocksMaster)
admin.site.register(StockPriceHistory)
admin.site.register(StockTimeframeCache)
admin.site.register(News)
admin.site.register(Insights)
admin.site.register(ScreenerResults)
