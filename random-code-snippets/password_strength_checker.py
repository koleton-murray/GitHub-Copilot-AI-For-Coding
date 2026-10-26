import re

def password_strength_checker(password):
    
    # the password strength checker should have 3 levels of strength.
    # weak, medium, strong
    # implement appropriate rules for each level of strength

    score = 0
    if len(password) >= 8:
        score += 1
    if len(password) >= 12:
        score += 1
    if re.search(r"[a-z]", password) and re.search(r"[A-Z]", password):
        score += 1
    if re.search(r"\d", password):
        score += 1
    if re.search(r"[^A-Za-z0-9]", password):
        score += 1

    if score <= 2:
        return "weak"
    elif score <= 4:
        return "medium"
    return "strong"

if __name__ == "__main__":
    
    # prompt the user to input a password then pass that to the password_strength_checker function

    password = input("Enter a password: ")
    print(password_strength_checker(password))