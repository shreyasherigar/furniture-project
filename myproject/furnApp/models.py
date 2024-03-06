
from django.db import models
from django.utils import timezone
import datetime


# Create your models here.
class Register_details(models.Model):
    first_name=models.CharField(max_length=200)
    last_name=models.CharField(max_length=200)
    username=models.CharField(max_length=200,unique=True)
    email=models.EmailField(max_length=100)
    phone=models.CharField(max_length=10)
    address=models.CharField(max_length=200)
    password=models.CharField(max_length=100)
    created_at=models.DateTimeField(default=datetime.datetime.now)
    
    def __str__(self):
        return self.first_name+' '+self.last_name

    
class Category(models.Model):
    type = models.CharField(max_length=200,unique=True)

    def __str__(self):
        return self.type

class Product_details(models.Model):
    name=models.CharField(max_length=100)
    description=models.TextField()
    condition=models.CharField(max_length=100)
    noofdays=models.PositiveIntegerField()
    Category=models.ForeignKey(Category,on_delete=models.CASCADE)
    options=models.JSONField()
    rentalOptions=models.JSONField()

    def __str__(self):
        return self.name+' details'
    

class Invoice(models.Model):
    STATUS_CHOICES = (
        ('ORDERED','Ordered'),
        ('CANCELLED','Cancelled'),
        ('DELIVERED','Delivered'),
    )
    customer=models.ForeignKey(Register_details, on_delete=models.CASCADE, to_field='username')
    status=models.CharField(max_length=20, choices=STATUS_CHOICES)
    items=models.TextField() 


    def __str__(self):
        return f"Invoice - {self.status}"
        



