// Add this customer data object at the top of your script
const CUSTOMERS = {
    'CUST001': {
        name: 'Acme Corporation',
        billing: '123 Business Plaza\nSuite 200\nNew York, NY 10001\nUnited States',
        shipping: '123 Business Plaza\nSuite 200\nNew York, NY 10001\nUnited States'
    },
    'CUST002': {
        name: 'TechStart Solutions',
        billing: '456 Innovation Drive\nBuilding B\nSan Francisco, CA 94105\nUnited States',
        shipping: '456 Innovation Drive\nBuilding B\nSan Francisco, CA 94105\nUnited States'
    },
    'CUST003': {
        name: 'Global Innovations Ltd',
        billing: '789 Corporate Park\nUnit 500\nChicago, IL 60601\nUnited States',
        shipping: '789 Corporate Park\nUnit 500\nChicago, IL 60601\nUnited States'
    },
    'CUST004': {
        name: 'Quantum Enterprises',
        billing: '321 Tech Lane\nFloor 15\nAustin, TX 78701\nUnited States',
        shipping: '567 Distribution Center\nWarehouse 7\nAustin, TX 78702\nUnited States'
    },
    'CUST005': {
        name: 'Summit Industries',
        billing: '951 Highland Tower\nSuite 800\nSeattle, WA 98101\nUnited States',
        shipping: '753 Port Way\nDock 12\nSeattle, WA 98106\nUnited States'
    },
    'CUST006': {
        name: 'Pioneer Technologies',
        billing: '147 Research Park\nBuilding C\nBoston, MA 02110\nUnited States',
        shipping: '147 Research Park\nBuilding C\nBoston, MA 02110\nUnited States'
    },
    'CUST007': {
        name: 'Elite Systems Inc',
        billing: '258 Industrial Blvd\nSuite 400\nDenver, CO 80202\nUnited States',
        shipping: '852 Warehouse District\nUnit 15\nDenver, CO 80216\nUnited States'
    },
    'CUST008': {
        name: 'Nexus Solutions',
        billing: '369 Commerce Court\nFloor 20\nMiami, FL 33131\nUnited States',
        shipping: '369 Commerce Court\nFloor 20\nMiami, FL 33131\nUnited States'
    }
};

// Function to add new row to the items table
function addNewRow() {
    const tbody = document.getElementById('itemsTableBody');
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>
            <select class="product-select">
                <option value="">Select Product</option>
                <optgroup label="Software Services">
                    <option value="SW001">Web Development - Basic</option>
                    <option value="SW002">Web Development - Advanced</option>
                    <option value="SW003">Mobile App Development</option>
                    <option value="SW004">API Integration</option>
                    <option value="SW005">Cloud Migration Services</option>
                </optgroup>
                <optgroup label="Consulting">
                    <option value="CS001">Technical Consultation</option>
                    <option value="CS002">Business Analysis</option>
                    <option value="CS003">Project Management</option>
                </optgroup>
                <optgroup label="Hardware">
                    <option value="HW001">Server Hardware</option>
                    <option value="HW002">Networking Equipment</option>
                    <option value="HW003">Storage Solutions</option>
                </optgroup>
                <optgroup label="Support">
                    <option value="SP001">Basic Support Plan</option>
                    <option value="SP002">Premium Support</option>
                    <option value="SP003">24/7 Enterprise Support</option>
                </optgroup>
            </select>
        </td>
        <td><input type="text" class="description-input"></td>
        <td><input type="number" class="qty-input"></td>
        <td><input type="number" class="rate-input"></td>
        <td><input type="number" class="tax-input"></td>
        <td class="amount">$0.00</td>
        <td class="actions">
            <button class="btn-icon delete-row" title="Delete Item">
                <svg width="16" height="16" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                </svg>
            </button>
        </td>
    `;
    tbody.appendChild(newRow);
    
    // Add event listeners
    addInputListeners(newRow);
    addDeleteListener(newRow);
    addProductListener(newRow);
}

// Function to calculate row amount
function calculateRowAmount(row) {
    const qty = parseFloat(row.querySelector('.qty-input').value) || 0;
    const rate = parseFloat(row.querySelector('.rate-input').value) || 0;
    const tax = parseFloat(row.querySelector('.tax-input').value) || 0;
    
    const amount = qty * rate;
    const taxAmount = amount * (tax / 100);
    const total = amount + taxAmount;
    
    row.querySelector('.amount').textContent = `$${total.toFixed(2)}`;
    calculateTotals();
}

// Function to calculate all totals
function calculateTotals() {
    const rows = document.querySelectorAll('#itemsTableBody tr');
    let subtotal = 0;
    let taxTotal = 0;
    
    rows.forEach(row => {
        const qty = parseFloat(row.querySelector('.qty-input').value) || 0;
        const rate = parseFloat(row.querySelector('.rate-input').value) || 0;
        const tax = parseFloat(row.querySelector('.tax-input').value) || 0;
        
        const amount = qty * rate;
        const taxAmount = amount * (tax / 100);
        
        subtotal += amount;
        taxTotal += taxAmount;
    });
    
    const shipping = parseFloat(document.getElementById('shipping').value) || 0;
    const grandTotal = subtotal + taxTotal + shipping;
    
    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('tax-total').textContent = `$${taxTotal.toFixed(2)}`;
    document.getElementById('grand-total').textContent = `$${grandTotal.toFixed(2)}`;
}

// Function to add input listeners to a row
function addInputListeners(row) {
    const inputs = row.querySelectorAll('input[type="number"]');
    inputs.forEach(input => {
        input.addEventListener('input', () => calculateRowAmount(row));
    });
}

// Function to clear the form
function clearForm() {
    if (confirm('Are you sure you want to clear all fields?')) {
        document.querySelector('.invoice-container').reset();
        const tbody = document.getElementById('itemsTableBody');
        tbody.innerHTML = `
            <tr>
                <td><select><option>Select Product</option></select></td>
                <td><input type="text"></td>
                <td><input type="number" class="qty-input"></td>
                <td><input type="number" class="rate-input"></td>
                <td><input type="number" class="tax-input"></td>
                <td class="amount">$0.00</td>
                <td class="actions">
                    <button class="btn-icon delete-row" title="Delete Item">
                        <svg width="16" height="16" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                        </svg>
                    </button>
                </td>
            </tr>
        `;
        calculateTotals();
        
        // Add listeners to the new row
        const firstRow = tbody.querySelector('tr');
        addInputListeners(firstRow);
        addDeleteListener(firstRow);
    }
}

// Add event listener for shipping changes
document.getElementById('shipping').addEventListener('input', calculateTotals);

// Initialize event listeners for existing rows
document.querySelectorAll('#itemsTableBody tr').forEach(row => {
    addInputListeners(row);
    addDeleteListener(row);
    addProductListener(row);
});

// Add new function to handle row deletion
function addDeleteListener(row) {
    const deleteBtn = row.querySelector('.delete-row');
    deleteBtn.addEventListener('click', function() {
        const tbody = document.getElementById('itemsTableBody');
        // Don't delete if it's the last row
        if (tbody.children.length > 1) {
            row.remove();
            calculateTotals();
        } else {
            // If it's the last row, just clear the inputs
            const inputs = row.querySelectorAll('input');
            inputs.forEach(input => input.value = '');
            row.querySelector('.amount').textContent = '$0.00';
            calculateTotals();
        }
    });
}

// Add new function to handle product selection
function addProductListener(row) {
    const productSelect = row.querySelector('.product-select');
    productSelect.addEventListener('change', function() {
        const descriptionInput = row.querySelector('.description-input');
        const rateInput = row.querySelector('.rate-input');
        
        // Sample product details - in a real application, this would come from a database
        const productDetails = {
            'SW001': { description: 'Basic website development package', rate: 1500 },
            'SW002': { description: 'Advanced website with custom features', rate: 3000 },
            'SW003': { description: 'Custom mobile application development', rate: 5000 },
            'SW004': { description: 'Third-party API integration services', rate: 2000 },
            'SW005': { description: 'Cloud migration and setup services', rate: 4000 },
            'CS001': { description: 'Technical consultation services (per day)', rate: 800 },
            'CS002': { description: 'Business analysis and reporting', rate: 1200 },
            'CS003': { description: 'Project management services', rate: 1500 },
            'HW001': { description: 'Enterprise server hardware', rate: 8000 },
            'HW002': { description: 'Network infrastructure equipment', rate: 3500 },
            'HW003': { description: 'Enterprise storage solutions', rate: 5000 },
            'SP001': { description: 'Basic support plan (monthly)', rate: 500 },
            'SP002': { description: 'Premium support plan (monthly)', rate: 1000 },
            'SP003': { description: '24/7 Enterprise support plan (monthly)', rate: 2500 }
        };

        const selected = productDetails[productSelect.value];
        if (selected) {
            descriptionInput.value = selected.description;
            rateInput.value = selected.rate;
            calculateRowAmount(row);
        }
    });
}

// Add these new functions
function initializeCustomerHandling() {
    const customerSelect = document.getElementById('customer');
    const billingAddress = document.getElementById('billingAddress');
    const shippingAddress = document.getElementById('shippingAddress');
    const sameAsShipping = document.getElementById('sameAsShipping');

    // Add change event listener to customer select
    customerSelect.addEventListener('change', function() {
        const selectedCustomer = CUSTOMERS[this.value];
        if (selectedCustomer) {
            billingAddress.value = selectedCustomer.billing;
            shippingAddress.value = selectedCustomer.shipping;
        } else {
            billingAddress.value = '';
            shippingAddress.value = '';
        }
    });

    // Add same as billing checkbox functionality
    sameAsShipping.addEventListener('change', function() {
        if (this.checked) {
            shippingAddress.value = billingAddress.value;
            shippingAddress.disabled = true;
        } else {
            const selectedCustomer = CUSTOMERS[customerSelect.value];
            if (selectedCustomer) {
                shippingAddress.value = selectedCustomer.shipping;
            }
            shippingAddress.disabled = false;
        }
    });

    // Add billing address change listener
    billingAddress.addEventListener('input', function() {
        if (sameAsShipping.checked) {
            shippingAddress.value = this.value;
        }
    });
}

// Update your DOMContentLoaded event listener to include the new initialization
document.addEventListener('DOMContentLoaded', function() {
    // Existing initialization code...
    initializeCustomerHandling();
    
    // Set today's date as default invoice date
    const today = new Date();
    const invoiceDateInput = document.getElementById('invoiceDate');
    invoiceDateInput.value = formatDate(today);
    
    // Add event listeners
    invoiceDateInput.addEventListener('change', updateDueDate);
    document.getElementById('terms').addEventListener('change', updateDueDate);
});

// Function to format date as YYYY-MM-DD
function formatDate(date) {
    return date.toISOString().split('T')[0];
}

// Function to calculate due date based on terms
function updateDueDate() {
    const invoiceDate = new Date(document.getElementById('invoiceDate').value);
    const terms = document.getElementById('terms').value;
    const dueDateInput = document.getElementById('dueDate');
    
    if (!invoiceDate || !terms) {
        dueDateInput.value = '';
        return;
    }

    let dueDate = new Date(invoiceDate);

    switch (terms) {
        case 'IMD':
            // Immediate payment - same as invoice date
            break;
        case 'NET15':
            dueDate.setDate(dueDate.getDate() + 15);
            break;
        case 'NET30':
            dueDate.setDate(dueDate.getDate() + 30);
            break;
        case 'NET45':
            dueDate.setDate(dueDate.getDate() + 45);
            break;
        case 'NET60':
            dueDate.setDate(dueDate.getDate() + 60);
            break;
        case 'EOM':
            // End of current month
            dueDate = new Date(dueDate.getFullYear(), dueDate.getMonth() + 1, 0);
            break;
        case 'COD':
            // Cash on Delivery - same as invoice date
            break;
        default:
            dueDateInput.value = '';
            return;
    }

    dueDateInput.value = formatDate(dueDate);
} 