from django.urls import path
from . import views

urlpatterns = [
    path('products/', views.ProductListAPIView.as_view(), name='product-list'),
    path('products/<slug:slug>/', views.ProductDetailAPIView.as_view(), name='product-detail'),
    path('categories/', views.CategoryListAPIView.as_view(), name='category-list'),
    path('users/register/', views.RegisterView.as_view(), name='auth_register'),
    path('orders/', views.CheckoutView.as_view(), name='checkout'),
]
