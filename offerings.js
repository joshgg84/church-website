
    // Navigation active state
    const navBars = document.querySelectorAll('.nav');
    navBars.forEach(nav => {
        nav.onclick = () => {
            navBars.forEach(nv => nv.classList.remove('active'));
            nav.classList.add('active');
        };
    });
    
    // Form title changer based on selection
    const select = document.querySelector('#selection');
    const formTitle = document.querySelector('#formTitle');
    
    const offeringTexts = {
        'Offering': 'Make an Offering',
        'Tithes': 'Tithe to the Lord',
        'First Fruit': 'Give Your First Fruit',
        'Thanksgiving': 'Give Thanks',
        'Donation': 'Make a Donation'
    };
    
    select.onchange = () => {
        const selection = select.value;
        formTitle.textContent = offeringTexts[selection] || 'Make an Offering';
    };
    
    // Payment method handler
    const paymentMethod = document.querySelector('#payment-method');
    const paymentTitle = document.querySelector('#paymentTitle');
    const paymentInfo = document.querySelector('#paymentInfo');
    
    const paymentDetails = {
        'Bank Transfer': {
            title: 'Bank Transfer',
            html: `
                <p><strong>Bank:</strong> First Bank of Nigeria</p>
                <p><strong>Account Name:</strong> Aflame Bible Church</p>
                <p><strong>Account Number:</strong> 1234567890</p>
                <p><strong>Sort Code:</strong> 011 123456</p>
                <button class="copy-btn" onclick="copyAccountNumber()">
                    <i class="fas fa-copy"></i> Copy Account Number
                </button>
                <p style="margin-top: 15px; color: #e67e22;">
                    <i class="fas fa-info-circle"></i> Upload transfer receipt after payment
                </p>
            `
        },
        'Card Payment': {
            title: 'Card Payment (Instant)',
            html: `
                <p><strong>✅ Secure payment via Paystack</strong></p>
                <p style="color: #27ae60; margin: 10px 0;">
                    <i class="fas fa-shield-alt"></i> We accept: Visa, Mastercard, Verve
                </p>
                <button onclick="initiatePaystackPayment()" class="copy-btn" style="background: darkred; width: 100%; padding: 15px; font-size: 1.1rem;">
                    <i class="fas fa-lock"></i> Pay Now with Card
                </button>
                <p style="margin-top: 15px; font-size: 0.9rem; color: #666;">
                    You'll receive confirmation instantly via email
                </p>
            `
        },
        'USSD': {
            title: 'USSD Banking',
            html: `
                <p><strong>Dial this code on your registered mobile line:</strong></p>
                <div style="background: #f0f0f0; padding: 15px; border-radius: 8px; text-align: center; margin: 15px 0;">
                    <span style="font-size: 1.5rem; font-weight: bold; color: darkred;">*894*1234567890#</span>
                </div>
                <p><strong>Steps:</strong></p>
                <p>1. Dial *894*1234567890#</p>
                <p>2. Enter amount to pay</p>
                <p>3. Enter your 4-digit PIN</p>
                <p>4. Confirm payment</p>
                <p style="color: #e67e22; margin-top: 10px;">
                    <i class="fas fa-mobile-alt"></i> Available on all networks
                </p>
            `
        }
    };
    
    paymentMethod.onchange = () => {
        const method = paymentMethod.value;
        paymentTitle.textContent = paymentDetails[method].title;
        paymentInfo.innerHTML = paymentDetails[method].html;
    };
    
    // Copy account number function
    window.copyAccountNumber = function() {
        const accountNumber = '1234567890';
        navigator.clipboard.writeText(accountNumber).then(() => {
            alert('✅ Account number copied to clipboard!');
        });
    };
    
    // ===========================================
    // ✅ PAYSTACK INTEGRATION - CARD PAYMENTS
    // ===========================================
    window.initiatePaystackPayment = function() {
        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const amount = document.getElementById('amount').value.trim();
        const reason = select.value;
        
        // Validate form
        if (!name || !email || !amount) {
            alert('❌ Please fill in your name, email and amount first');
            return;
        }
        
        if (!email.includes('@') || !email.includes('.')) {
            alert('❌ Please enter a valid email address');
            return;
        }
        
        if (amount < 100) {
            alert('❌ Minimum amount is ₦100');
            return;
        }
        
        if (reason === 'Select your reason for payment') {
            alert('❌ Please select a reason for payment');
            return;
        }
        
        // Convert to kobo (Paystack uses smallest currency unit)
        const amountInKobo = parseFloat(amount) * 100;
        
        // Generate unique reference
        const reference = 'ABC-' + Date.now() + '-' + Math.floor(Math.random() * 1000000);
        
        // Initialize Paystack
        const handler = PaystackPop.setup({
            key: 'pk_test_809828d119fad3a4c66c7', 
            email: email,
            amount: amountInKobo,
            currency: 'NGN',
            ref: reference,
            metadata: {
                custom_fields: [
                    {
                        display_name: "Full Name",
                        variable_name: "full_name",
                        value: name
                    },
                    {
                        display_name: "Payment Reason",
                        variable_name: "payment_reason",
                        value: reason
                    }
                ]
            },
            callback: function(response) {
                // This runs when payment is successful
                console.log('Payment successful:', response);
                
                // Show success modal
                modalMessage.textContent = `Thank you ${name}! Your ${reason.toLowerCase()} of ₦${amount} was successful.`;
                modal.style.display = 'flex';
                
                // Reset form
                form.reset();
                select.selectedIndex = 0;
                formTitle.textContent = 'Make an Offering';
                
                // Optional: Send to your server to save record
                // fetch('/api/save-payment', {
                //     method: 'POST',
                //     headers: {'Content-Type': 'application/json'},
                //     body: JSON.stringify({
                //         reference: response.reference,
                //         name, email, amount, reason
                //     })
                // });
            },
            onClose: function() {
                // This runs if user closes the popup without paying
                alert('Payment cancelled. You can try again anytime.');
            }
        });
        
        // Open Paystack payment modal
        handler.openIframe();
    };
    
    // ===========================================
    // Form submission handler
    // ===========================================
    const form = document.querySelector('#offering-form');
    const modal = document.getElementById('successModal');
    const modalMessage = document.getElementById('modalMessage');
    
    form.onsubmit = (e) => {
        e.preventDefault();
        
        const method = paymentMethod.value;
        
        if (method === 'Card Payment') {
            // Card payments go through Paystack
            initiatePaystackPayment();
        } else {
            // Bank Transfer and USSD - manual payment
            const name = document.querySelector('#name').value;
            const amount = document.querySelector('#amount').value;
            const reason = select.value;
            
            if (!name || !amount || reason === 'Select your reason for payment') {
                alert('❌ Please fill all fields correctly!');
                return;
            }
            
            // Show payment instructions
            if (method === 'Bank Transfer') {
                alert(`🏦 Please transfer ₦${amount} to:\n\nFirst Bank\nAccount: 1234567890\nName: Aflame Bible Church\n\nAfter transfer, email your receipt to finance@aflamebiblechurch.org`);
            } else if (method === 'USSD') {
                alert(`📱 Dial *894*1234567890# and enter ₦${amount} to complete payment.`);
            }
            
            // Show thank you modal
            modalMessage.textContent = `Thank you ${name}! Your ${reason.toLowerCase()} of ₦${amount} has been recorded.`;
            modal.style.display = 'flex';
            
            // Reset form
            form.reset();
            select.selectedIndex = 0;
            formTitle.textContent = 'Make an Offering';
        }
    };
    
    // Close modal
    window.closeModal = function() {
        modal.style.display = 'none';
    };
    
    // Logo preview
    const logo = document.querySelector('.aflame');
    const logoModal = document.getElementById('logoModal');
    
    window.closeLogoModal = function() {
        logoModal.style.display = 'none';
    };
    
    if (logo) {
        logo.onclick = () => {
            logoModal.style.display = 'flex';
        };
    }
    
    // Close modal when clicking outside
    window.onclick = (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
        if (e.target === logoModal) {
            logoModal.style.display = 'none';
        }
    };
    
    // Trigger initial payment method display
    setTimeout(() => {
        paymentMethod.dispatchEvent(new Event('change'));
    }, 100);
    
    // Disable first option
    select.options[0].disabled = true;
    
    console.log('✅ Offerings page ready with Paystack integration');