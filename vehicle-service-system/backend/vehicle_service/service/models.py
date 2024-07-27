from django.db import models


class Component(models.Model):
    name = models.CharField(max_length=100)
    repair_price = models.DecimalField(max_digits=10, decimal_places=2)
    purchase_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)

    def __str__(self):
        return self.name


class Vehicle(models.Model):
    make = models.CharField(max_length=100)
    model = models.CharField(max_length=100)
    year = models.PositiveIntegerField()

    def __str__(self):
        return f"{self.make} {self.model} ({self.year})"


class Issue(models.Model):
    vehicle = models.ForeignKey(Vehicle, on_delete=models.CASCADE)
    description = models.TextField()
    component = models.ForeignKey(Component, on_delete=models.SET_NULL, null=True, blank=True)
    repair_needed = models.BooleanField(default=False)
    repair_price = models.DecimalField(max_digits=10, decimal_places=2, null=True,
                                       blank=True)  # Additional field for repair price

    def __str__(self):
        return f"Issue in {self.vehicle} - {self.description}"


class Transaction(models.Model):
    vehicle = models.ForeignKey(Vehicle, on_delete=models.CASCADE)
    issue = models.ForeignKey(Issue, on_delete=models.CASCADE)
    final_price = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"Transaction for {self.vehicle} - {self.final_price} on {self.date}"
