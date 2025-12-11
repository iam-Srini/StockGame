from django.urls import path
from . import views


urlpatterns = [
    path('', views.home, name='home'),
    path('stock/<str:stock_symbol>/', views.get_stock_data, name='get_stock_data'),
    path('watchlist/', views.get_watchlist, name='get_watchlist'),
    path('insights/<str:stock_symbol>/', views.get_ai_insights, name='get_stock_insights'),
    path('news/<str:stock_symbol>/', views.get_stk_news, name = 'get_stk_news'),
    path('reports/<str:stock_symbol>/', views.get_stk_reports, name = 'get_stk_reports'),
    path('gainers/',views.get_stk_gainers,name='get_stk_gainers'),
    path('losers/',views.get_stk_losers,name='get_stk_losers'),
    path('holdings/',views.get_user_holdings, name='get_holdings'),
    path('myprofile/',views.get_user_profile, name='get_user_profile'),
    path('screener/',views.get_screener_results, name='get_screener_results'),
]