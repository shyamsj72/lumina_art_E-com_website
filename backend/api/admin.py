from django.contrib import admin
from .models import Category, Product, ProductVariant, Order, OrderItem

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug']
    prepopulated_fields = {'slug': ('name',)}

class ProductVariantInline(admin.TabularInline):
    model = ProductVariant
    extra = 1

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['name', 'category', 'created_at']
    list_filter = ['created_at', 'updated_at', 'category']
    prepopulated_fields = {'slug': ('name',)}
    inlines = [ProductVariantInline]

class OrderItemInline(admin.TabularInline):
    model = OrderItem
    raw_id_fields = ['product_variant']

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ['id', 'first_name', 'last_name', 'email', 'address', 'paid', 'created_at']
    list_filter = ['paid', 'created_at', 'updated_at']
    inlines = [OrderItemInline]
