from .views import RegisterView,CategoryView,CategoriesView,LoginView,CreateProduct,ProductListView,InvoiceListView
from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token
from knox import views as knox_views

urlpatterns = [
    path('register/',RegisterView.as_view()),
    path('login/',LoginView.as_view()),
    path('logout/', knox_views.LogoutView.as_view(), name='knox_logout'),
    path('category/',CategoryView.as_view()),
    path('categories/',CategoriesView.as_view()),
    path('product/', CreateProduct.as_view()),    
    path('<str:category>/', ProductListView.as_view(), name='product-list'),
    path('invoice', InvoiceListView.as_view()),
]
