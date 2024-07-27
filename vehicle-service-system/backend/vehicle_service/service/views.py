from datetime import datetime, timedelta

from django.db.models import Sum
from django.views.generic import TemplateView
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Component, Vehicle, Issue, Transaction
from .serializers import ComponentSerializer, VehicleSerializer, IssueSerializer, TransactionSerializer


# service/views.py


class IndexView(TemplateView):
    template_name = 'index.html'


class ComponentViewSet(viewsets.ModelViewSet):
    queryset = Component.objects.all()
    serializer_class = ComponentSerializer


class VehicleViewSet(viewsets.ModelViewSet):
    queryset = Vehicle.objects.all()
    serializer_class = VehicleSerializer


class IssueViewSet(viewsets.ModelViewSet):
    queryset = Issue.objects.all()
    serializer_class = IssueSerializer


class TransactionViewSet(viewsets.ModelViewSet):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer

    def perform_create(self, serializer):
        issue = Issue.objects.get(pk=serializer.validated_data['issue'].id)
        final_price = issue.repair_price if issue.repair_needed else issue.component.purchase_price
        serializer.save(final_price=final_price)


# views.py


class RevenueView(APIView):
    def get(self, format=None):
        # Example: Calculate revenue for the last 30 days
        end_date = datetime.today()
        start_date = end_date - timedelta(days=30)

        transactions = Transaction.objects.filter(date__range=[start_date, end_date]).values('date').annotate(
            revenue=Sum('final_price')).order_by('date')

        data = [{'date': trans['date'], 'revenue': trans['revenue']} for trans in transactions]

        return Response(data)
