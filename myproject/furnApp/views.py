from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import RegisterSerializer,CategorySerializer,ProductSerializer,ProductListSerializer,InvoiceSerializer,userSerializer
from rest_framework import status
from .models import Register_details,Category,Product_details,Invoice
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.hashers import make_password,check_password
from django.contrib.auth.hashers import PBKDF2PasswordHasher

from django.contrib.auth import authenticate,login,logout
from rest_framework.permissions import AllowAny
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view
from rest_framework.response import Response


# print(make_password('1234'))
# print(check_password('1234','pbkdf2_sha256$390000$n105eX1DqErQ7ni8uJQB5z$Y2hkXqkGbTeyiORoJGGa7jzbvZVrALuglBNZ9buSMkE='))


# Create your views here.
class RegisterView(APIView):

    def post(self, request): 
        if request.method == 'POST': 
            try:
                serializer=RegisterSerializer(data=request.data)
                if serializer.is_valid():
                    serializer.save()
                    print(request.data)
                    return Response({'status':'registred successfully', 'data':serializer.data}, status=status.HTTP_201_CREATED)
                else:
                    return Response({'status':'error', 'data':serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
            except Exception as e:
                return Response({'Username name already exists'},status=status.HTTP_400_BAD_REQUEST)
        else: 
            return Response({"error": "Only POST method is allowed."}, status=405)
        
        
    
    
class LoginView(APIView):
    def post(self, request):
        if request.method == 'POST':
            data = request.data
            try:
                if not data['username'] or not data['password']:
                    return Response({"error": "Username and password are required."}, status=400)
                register = Register_details.objects.get(username=data['username'])
                print(register)
                if register:
                    if check_password(data['password'], register.password):
                        return Response({"message": "Login successful"}, status=200)
                    else:
                        return Response({"error": "Invalid password"}, status=401)
                else:
                    return Response({"error": "Invalid username"}, status=401)

            except Register_details.DoesNotExist:
                return Response({"error": "Invalid username/password"}, status=401)

        else:
            return Response({"error": "Only POST method is allowed."}, status=405)


class CategoryView(APIView):
    permission_classes=[IsAuthenticated]
    def post(self,request):
        try:
            if request.method == 'POST':
                serializer = CategorySerializer(data=request.data)
                if serializer.is_valid():
                    serializer.save()
                    return Response(serializer.data, status=status.HTTP_201_CREATED)
                return Response({'status':'Category already exits'}, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({"error": "Only POST method is allowed."}, status=405)
        except Exception as e:
            return Response({"error": 'Category already exits'})
        
       
class CategoriesView(APIView):
    def get(self,request, *args, **kwargs):
        try:
            if request.method == 'GET':
                categories = Category.objects.all()
                serializer = CategorySerializer(categories, many=True)
                return Response({"status":"success","Categories":serializer.data},status=200)
            else:
                return Response({"error": "Only GET method is allowed."}, status=405)
        except Exception as e:
            return Response({"error": str(e)}, status=500)
        
       
class CreateProduct(APIView):
    def get(self,request, *args, **kwargs):
        try:
            products= Product_details.objects.all()
            serializer = ProductSerializer(products, many=True)
            return Response({"status":"success","Products":serializer.data},status=200)
        except Exception as e:
            return Response({"error": str(e)}, status=500)
    
    def post(self, request):
        permission_classes=[IsAuthenticated]
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'status':"Product created",'data':serializer.data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class ProductListView(APIView):
   
    def get(self, request, category):
        try:
            products = Product_details.objects.filter(Category__type=category)
            # print(products)
            
            if products:
                serializer = ProductListSerializer(products, many=True)
                return Response({'status': 'Success','data': serializer.data}, status=status.HTTP_200_OK)
            else:
                return Response({'status': "category maynotexits"}, status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

class InvoiceListView(APIView):
    def get(self, request):
        status_param = request.data.get('status')
        if status_param:
            invoices = Invoice.objects.filter(status=status_param)
        else:
            invoices = Invoice.objects.all()
        serializer= InvoiceSerializer(invoices, many=True)
        if invoices:
            return Response({'status':'Success','Invoice':serializer.data})
        else:
            return Response({'No invoice created'})
        
 
    def post(self, request):
        try:
            serializer = InvoiceSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response({'status': 'Invoice created','data':serializer.data}, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
       