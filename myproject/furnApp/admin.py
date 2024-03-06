from django.contrib import admin
from .models import Register_details,Category,Product_details,Invoice

# Register your models here.
admin.site.register(Register_details)
admin.site.register(Category)
admin.site.register(Product_details)
admin.site.register(Invoice)

        
