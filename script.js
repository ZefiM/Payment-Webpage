
function updateForm(Payment)
{
	if(Payment.value == "CC") 
	{
		document.getElementById("CreditCardSelected").style.visibility = 'visible';
        document.getElementById("PayPalSelected").style.visibility = 'hidden';
    }else 
		if(Payment.value == "PayPal") 
		{
			document.getElementById("CreditCardSelected").style.visibility = 'hidden';
			document.getElementById("PayPalSelected").style.visibility = 'visible';
        }
}

function validateForm()
{

	ValidControl = false;
	ValidCreditCard = false;
	ValidState = false;
	ValidPassword = false;
	ValidEmail = false;
	ValidDate = false;
	var PayType = document.querySelector('input[name="PaymentSelector"]:checked').value;
	
	if(PayType == "CC")
	{
		var fName = document.forms["CreditCardForm"]["FirstName"].value;
		var lName = document.forms["CreditCardForm"]["LastName"].value;
		var Zip = document.forms["CreditCardForm"]["ZipCode"].value;
		var Address = document.forms["CreditCardForm"]["Address"].value;
		var CVC = document.forms["CreditCardForm"]["CVC"].value;
		var City = document.forms["CreditCardForm"]["City"].value;
		var Cardholder = document.forms["CreditCardForm"]["CardholderName"].value;
		var Email = document.forms["CreditCardForm"]["Email"].value;
		var CardNum = document.forms["CreditCardForm"]["CCNumber"].value;
		var ExpMonth = document.forms["CreditCardForm"]["ccExpMonth"].value;
		var ExpYear = document.forms["CreditCardForm"]["ccExpYear"].value;

		ValidCreditCard = validateCreditCard(CardNum);
		ValidControl = validateControl(fName, "NotEmptyNoNumbers", 1)
		if(ValidControl == false)
		{
			alert("First Name is either empty or has numbers in it");
		}
		ValidControl = validateControl(lName, "NotEmptyNoNumbers", 1)
		if(ValidControl == false)
		{
			alert("Last Name is either empty or has numbers in it");
		}
		ValidControl = validateControl(Address, "NotEmpty", 1)
		if(ValidControl == false)
		{
			alert("Address is empty");
		}
		ValidControl = validateControl(City, "NotEmptyNoNumbers", 1)
		if(ValidControl == false)
		{
			alert("City is either empty or has numbers in it");
		}
		ValidControl = validateControl(Cardholder, "NotEmptyNoNumbers", 1)
		if(ValidControl == false)
		{
			alert("Cardholder's Name is either empty or has numbers in it");
		}			
		ValidControl = validateControl(Zip, "ZipOrCVC", 5)
		if(ValidControl == false)
		{
			alert("Zip Code is either too short, too long, or has other characters in it besides numbers");
		}
		ValidControl = validateControl(CVC, "ZipOrCVC", 3)
		if(ValidControl == false)
		{
			alert("CVC Code is either too short, too long, or has other characters in it besides numbers");
		}			
		ValidState = validateState();
		ValidEmail = validateEmail(CreditCardForm);
		if(ValidControl && ValidCreditCard && ValidState && ValidEmail == true)
		{
			alert("Completed");
		}
	}else
		if(PayType == "PayPal")
	{
		var PPEmail = document.forms["PayPalForm"]["Email"].value;
		var Pass = document.forms["PayPalForm"]["Password"].value;
		ValidEmail = validateEmail(PayPalForm);
		ValidPassword = validatePassword(Pass, 5);
		if(ValidEmail && ValidPassword == true)
		{
			alert("Completed");
		}
		
	}
}

function validateEmail(EmailForm)
{
	if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(EmailForm.Email.value))
	{
		return (true)
	}
	else
    alert("You have entered an invalid email address!");
    return (false)
}

function testLength(value, length, exactlength)
{
	if(exactlength == 15)
	{
		if(value.length == length)
		{
			return (true)
		}
		else
			return (false)
	}
	else
		if(exactlength == 1)
		{				
			if(value.length >= length)
			{
				return (true)
			}
			else
				return (false)
		}
}

function testNumber(value)
{
	if(isNaN(value))
	{
		return (false)
	}
	else
		return (true)
	
}

function validateControl(control, name, length)
{
	var NotEmpty = true;
	var NotEmptyNoNumbers = true;
	var ZipCVC = true;
	if(name == "NotEmptyNoNumbers")
	{
		NotEmptyNoNumbers = testLength(control, length, 1);
		if(NotEmptyNoNumbers != true)
		{
			return (false)
		}
		NotEmptyNoNumbers = testNumber(control);
		if(NotEmptyNoNumbers != true)
		{
			return (true)
		}
		else
		{
			return (false)
		}
		
	}
	else
	if(name == "ZipOrCVC")
	{
		ZipCVC = testLength(control, length, 15);
		if(ZipCVC != true)
		{
			return (false)
		}
		ZipCVC = testNumber(control);
		if(ZipCVC != true)
		{
			return (false)
		}
		else
		{			
			return (true)
		}
		
	}else
	if(name == "NotEmpty")
	{
		NotEmpty = testLength(control, length, 1);
		if(NotEmpty != true)
		{
			return (false)
		}
		else
		{
			return (true)
		}
	}
}

function validateDate(ExpMonth, ExpYear)
{
	
}

function validateState()
{
	var State = (document.forms["CreditCardForm"]["State"].value);
	if (State == "N/A") 
	{
		alert("Please Select a State!");
		return false;
    }else
		return true;
}

function validatePassword(value, minLength)
{
	if(value.length >= minLength)
	{
		return (true)
	}
	else
		alert("You have entered an invalid Password, it needs to be atleast 5 characters");
		return (false)
}

function validateCreditCard(CardNumber)
{
	var CardNum = CardNumber.replace(/\s+/g, '');
	var IsNum = false;
	var length = false;
	if(CardNum.charAt(0) >= 3) 
	{
		if(CardNum.charAt(0) > 6)			
		{
			alert("Credit Card Number: "+ CardNum + " must have a valid 1st Digit!");
			return;
		}
		else			
		if(CardNum.charAt(0) == 3)
		{
			length = testLength(CardNum, 15, 15);
			if(length != true) 
			{
				alert("Length of Credit Card Number: "+ CardNum + " is incorrect!");
			}
		}
		else
			if(CardNum.charAt(0) >= 4)
			{
				length = testLength(CardNum, 16, 15);
				if(length != true) 
				{
					alert("Length of Credit Card Number: "+ CardNum + " is incorrect!");
				}
			isNum = testNumber(CardNum);
			if(isNum != true) 
				{
				alert("Credit Card Number: "+ CardNum + " must have numbers only!");
				}
			}
		
	}
	else
		alert("Credit Card Number: "+ CardNum + " must have a valid 1st Digit!");
		return;

}



