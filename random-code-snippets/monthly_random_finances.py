import random

def monthly_random_finances():

    # return an array of objects for months jan-dec.
    # each month must have an income and expense value associated with it that is randomly generated.
    # each value must be between 10 and 5000

    months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    return [
        {"month": month, "income": random.randint(10, 5000), "expense": random.randint(10, 5000)}
        for month in months
    ]


if __name__ == "__main__":
    print(monthly_random_finances())