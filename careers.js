// Careers page specific JavaScript

// Application Form Handling
const applicationForm = document.getElementById('applicationForm');

if (applicationForm) {
    applicationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = {
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            position: formData.get('position'),
            experience: formData.get('experience'),
            address: formData.get('address'),
            education: formData.get('education'),
            workExperience: formData.get('workExperience'),
            skills: formData.get('skills'),
            availability: formData.get('availability'),
            expectedSalary: formData.get('expectedSalary'),
            motivation: formData.get('motivation'),
            references: formData.get('references'),
            terms: formData.get('terms'),
            newsletter: formData.get('newsletter')
        };
        
        // Validate form
        if (!validateApplicationForm(data)) {
            return;
        }
        
        // Show success message
        showNotification('Thank you for your application! We will review it and contact you soon.', 'success');
        
        // Reset form
        this.reset();
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Application Form Validation
function validateApplicationForm(data) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[\+]?[\d\s\-\(\)]+$/;
    
    // Required field validations
    if (!data.firstName.trim()) {
        showNotification('Please enter your first name.', 'error');
        return false;
    }
    
    if (!data.lastName.trim()) {
        showNotification('Please enter your last name.', 'error');
        return false;
    }
    
    if (!emailRegex.test(data.email)) {
        showNotification('Please enter a valid email address.', 'error');
        return false;
    }
    
    if (!phoneRegex.test(data.phone)) {
        showNotification('Please enter a valid phone number.', 'error');
        return false;
    }
    
    if (!data.position) {
        showNotification('Please select a position.', 'error');
        return false;
    }
    
    if (!data.education.trim()) {
        showNotification('Please describe your educational background.', 'error');
        return false;
    }
    
    if (!data.workExperience.trim()) {
        showNotification('Please describe your work experience.', 'error');
        return false;
    }
    
    if (!data.availability) {
        showNotification('Please select your availability.', 'error');
        return false;
    }
    
    if (!data.motivation.trim()) {
        showNotification('Please tell us why you want to work with us.', 'error');
        return false;
    }
    
    if (!data.terms) {
        showNotification('Please agree to the terms and conditions.', 'error');
        return false;
    }
    
    return true;
}

// Position card click handlers
document.addEventListener('DOMContentLoaded', function() {
    const positionCards = document.querySelectorAll('.position-card');
    const positionSelect = document.getElementById('position');
    
    positionCards.forEach(card => {
        const applyButton = card.querySelector('.btn-primary');
        const positionTitle = card.querySelector('.position-title').textContent;
        
        if (applyButton) {
            applyButton.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Set the position in the form
                if (positionSelect) {
                    const optionValue = getPositionValue(positionTitle);
                    if (optionValue) {
                        positionSelect.value = optionValue;
                    }
                }
                
                // Scroll to application form
                const applicationSection = document.getElementById('application-form');
                if (applicationSection) {
                    applicationSection.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        }
    });
});

// Helper function to map position titles to select values
function getPositionValue(title) {
    const positionMap = {
        'Registered Nurse': 'registered-nurse',
        'Physiotherapist': 'physiotherapist',
        'Home Care Assistant': 'home-care-assistant',
        'Medical Technician': 'medical-technician',
        'Customer Service Representative': 'customer-service',
        'Ambulance Driver': 'ambulance-driver'
    };
    
    return positionMap[title] || '';
}

// Enhanced form interactions
document.addEventListener('DOMContentLoaded', function() {
    // Add character count for textareas
    const textareas = document.querySelectorAll('textarea');
    textareas.forEach(textarea => {
        if (textarea.hasAttribute('maxlength')) {
            addCharacterCounter(textarea);
        }
    });
    
    // Add real-time validation feedback
    const inputs = document.querySelectorAll('input[required], select[required], textarea[required]');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            clearFieldError(this);
        });
    });
});

// Add character counter to textareas
function addCharacterCounter(textarea) {
    const maxLength = textarea.getAttribute('maxlength');
    const counter = document.createElement('div');
    counter.className = 'character-counter';
    counter.style.cssText = `
        text-align: right;
        font-size: 14px;
        color: #64748b;
        margin-top: 4px;
    `;
    
    const updateCounter = () => {
        const remaining = maxLength - textarea.value.length;
        counter.textContent = `${textarea.value.length}/${maxLength}`;
        counter.style.color = remaining < 50 ? '#ef4444' : '#64748b';
    };
    
    textarea.addEventListener('input', updateCounter);
    textarea.parentNode.appendChild(counter);
    updateCounter();
}

// Field validation
function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.getAttribute('name');
    
    clearFieldError(field);
    
    if (field.hasAttribute('required') && !value) {
        showFieldError(field, 'This field is required');
        return false;
    }
    
    if (fieldName === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showFieldError(field, 'Please enter a valid email address');
            return false;
        }
    }
    
    if (fieldName === 'phone' && value) {
        const phoneRegex = /^[\+]?[\d\s\-\(\)]+$/;
        if (!phoneRegex.test(value)) {
            showFieldError(field, 'Please enter a valid phone number');
            return false;
        }
    }
    
    return true;
}

// Show field error
function showFieldError(field, message) {
    field.style.borderColor = '#ef4444';
    
    let errorElement = field.parentNode.querySelector('.field-error');
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.style.cssText = `
            color: #ef4444;
            font-size: 14px;
            margin-top: 4px;
        `;
        field.parentNode.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
}

// Clear field error
function clearFieldError(field) {
    field.style.borderColor = '#e2e8f0';
    
    const errorElement = field.parentNode.querySelector('.field-error');
    if (errorElement) {
        errorElement.remove();
    }
}

// File upload handling (if needed in future)
function handleFileUpload(input) {
    const file = input.files[0];
    if (file) {
        const maxSize = 5 * 1024 * 1024; // 5MB
        const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        
        if (file.size > maxSize) {
            showNotification('File size must be less than 5MB', 'error');
            input.value = '';
            return false;
        }
        
        if (!allowedTypes.includes(file.type)) {
            showNotification('Please upload a PDF or Word document', 'error');
            input.value = '';
            return false;
        }
        
        return true;
    }
}

// Auto-save form data to localStorage
function autoSaveForm() {
    const form = document.getElementById('applicationForm');
    if (!form) return;
    
    const formData = new FormData(form);
    const data = {};
    
    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }
    
    localStorage.setItem('alfabeta_application_draft', JSON.stringify(data));
}

// Restore form data from localStorage
function restoreFormData() {
    const savedData = localStorage.getItem('alfabeta_application_draft');
    if (!savedData) return;
    
    try {
        const data = JSON.parse(savedData);
        const form = document.getElementById('applicationForm');
        if (!form) return;
        
        Object.keys(data).forEach(key => {
            const field = form.querySelector(`[name="${key}"]`);
            if (field) {
                if (field.type === 'checkbox') {
                    field.checked = data[key] === 'on';
                } else {
                    field.value = data[key];
                }
            }
        });
        
        showNotification('Draft application restored', 'info');
    } catch (e) {
        console.error('Error restoring form data:', e);
    }
}

// Clear saved form data
function clearSavedFormData() {
    localStorage.removeItem('alfabeta_application_draft');
}

// Auto-save on form input
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('applicationForm');
    if (form) {
        // Restore saved data on page load
        restoreFormData();
        
        // Auto-save on input
        form.addEventListener('input', debounce(autoSaveForm, 1000));
        
        // Clear saved data on successful submission
        form.addEventListener('submit', function() {
            setTimeout(clearSavedFormData, 1000);
        });
    }
});

// Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}