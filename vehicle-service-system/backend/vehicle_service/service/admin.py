from django.contrib import admin
from .models import Vehicle,Component,Transaction,Issue
# Register your models here.
admin.site.register(Vehicle)
admin.site.register(Component)
admin.site.register(Transaction)
admin.site.register(Issue)
