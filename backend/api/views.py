from rest_framework import generics
from .models import Category, Product
from .serializers import CategorySerializer, ProductSerializer

class ProductListAPIView(generics.ListAPIView):
    # Just returning all products for now, we can filter in the frontend if variants are empty
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class ProductDetailAPIView(generics.RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    lookup_field = 'slug'

class CategoryListAPIView(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny, IsAuthenticated
from .serializers import RegisterSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Order, OrderItem, ProductVariant

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer

class CheckoutView(APIView):
    permission_classes = (AllowAny,) # Set to AllowAny for guest checkout for now

    def post(self, request):
        data = request.data
        items = data.get('items', [])
        
        if not items:
            return Response({"error": "Cart is empty"}, status=status.HTTP_400_BAD_REQUEST)

        # Create Order
        order = Order.objects.create(
            first_name=data.get('first_name', ''),
            last_name=data.get('last_name', ''),
            email=data.get('email', ''),
            address=data.get('address', ''),
            city=data.get('city', ''),
            postal_code=data.get('postal_code', ''),
            user=request.user if request.user.is_authenticated else None
        )

        total_price = 0

        # Create OrderItems
        for item in items:
            try:
                variant = ProductVariant.objects.get(id=item['variantId'])
                quantity = item.get('quantity', 1)
                price = variant.price
                
                OrderItem.objects.create(
                    order=order,
                    product_variant=variant,
                    price=price,
                    quantity=quantity
                )
                total_price += float(price) * quantity
            except ProductVariant.DoesNotExist:
                pass # Or handle error appropriately

        return Response({"message": "Order placed successfully", "order_id": order.id}, status=status.HTTP_201_CREATED)
