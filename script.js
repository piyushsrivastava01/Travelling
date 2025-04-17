document.addEventListener('DOMContentLoaded', function() {
    // Destinations Data
    const destinations = [
        {
            id: 'taj-mahal',
            title: 'Taj Mahal',
            location: 'Agra, Uttar Pradesh',
            description: 'The Taj Mahal is an ivory-white marble mausoleum on the right bank of the Yamuna river in Agra. It was commissioned in 1632 by the Mughal emperor Shah Jahan to house the tomb of his favorite wife, Mumtaz Mahal.',
            image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            price: '₹1500'
        },
        {
            id: 'red-fort',
            title: 'Red Fort',
            location: 'Delhi',
            description: 'The Red Fort is a historic fort in the city of Delhi in India that served as the main residence of the Mughal Emperors. Emperor Shah Jahan commissioned construction of the Red Fort on 12 May 1638, when he decided to shift his capital from Agra to Delhi.',
            image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            price: '₹500'
        },
        {
            id: 'hampi',
            title: 'Hampi',
            location: 'Karnataka',
            description: 'Hampi is an ancient village in the south Indian state of Karnataka. It\'s dotted with numerous ruined temple complexes from the Vijayanagara Empire. On the south bank of the River Tungabhadra is the 7th-century Hindu Virupaksha Temple, near the revived Hampi Bazaar.',
            image: 'https://images.unsplash.com/photo-1584811649984-8dd5fc4e5a8e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            price: '₹1000'
        },
        {
            id: 'khajuraho',
            title: 'Khajuraho Temples',
            location: 'Madhya Pradesh',
            description: 'The Khajuraho Group of Monuments are a group of Hindu and Jain temples in Chhatarpur district, Madhya Pradesh, India. They are a UNESCO World Heritage Site. The temples are famous for their nagara-style architectural symbolism and their erotic sculptures.',
            image: 'https://images.unsplash.com/photo-1587471385290-2d28a1f81a6a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            price: '₹800'
        },
        {
            id: 'ajanta-ellora',
            title: 'Ajanta & Ellora Caves',
            location: 'Maharashtra',
            description: 'The Ajanta Caves are approximately 30 rock-cut Buddhist cave monuments which date from the 2nd century BCE to about 480 CE. The Ellora Caves are a multi-religious rock-cut cave complex with artwork dating from the period 600-1000 CE.',
            image: 'https://images.unsplash.com/photo-1584811649984-8dd5fc4e5a8e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            price: '₹1200'
        },
        {
            id: 'qutub-minar',
            title: 'Qutub Minar',
            location: 'Delhi',
            description: 'The Qutub Minar is a minaret that forms part of the Qutb complex, a UNESCO World Heritage Site in the Mehrauli area of Delhi. It is one of the most visited tourist spots in the city, mostly built between 1199 and 1220.',
            image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            price: '₹600'
        }
    ];

    // DOM Elements
    const destinationGrid = document.getElementById('destinationGrid');
    const bookingModal = document.getElementById('bookingModal');
    const authModal = document.getElementById('authModal');
    const confirmationModal = document.getElementById('confirmationModal');
    const loginBtn = document.getElementById('loginBtn');
    const signupBtn = document.getElementById('signupBtn');
    const closeButtons = document.querySelectorAll('.close-btn');
    const tabButtons = document.querySelectorAll('.tab-btn');
    const authForms = document.querySelectorAll('.auth-form');
    const bookingForm = document.getElementById('bookingForm');
    const searchForm = document.getElementById('searchForm');
    const newsletterForm = document.getElementById('newsletterForm');
    const closeConfirmation = document.getElementById('closeConfirmation');

    // Current booking details
    let currentBooking = {};

    // Load destinations
    function loadDestinations(filter = '') {
        destinationGrid.innerHTML = '';
        
        const filteredDestinations = filter ? 
            destinations.filter(dest => dest.id === filter) : 
            destinations;
        
        filteredDestinations.forEach(destination => {
            const card = document.createElement('div');
            card.className = 'destination-card';
            card.innerHTML = `
                <div class="destination-img">
                    <img src="${destination.image}" alt="${destination.title}">
                </div>
                <div class="destination-info">
                    <h3>${destination.title}</h3>
                    <div class="location">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${destination.location}</span>
                    </div>
                    <p>${destination.description}</p>
                    <div class="destination-meta">
                        <div class="price">From ${destination.price}</div>
                        <button class="book-now" data-id="${destination.id}">Book Now</button>
                    </div>
                </div>
            `;
            destinationGrid.appendChild(card);
        });

        // Add event listeners to book now buttons
        document.querySelectorAll('.book-now').forEach(button => {
            button.addEventListener('click', function() {
                const destId = this.getAttribute('data-id');
                openBookingModal(destId);
            });
        });
    }

    // Open booking modal
    function openBookingModal(destId) {
        const destination = destinations.find(dest => dest.id === destId);
        if (!destination) return;

        document.getElementById('modalTitle').textContent = `Book Tour to ${destination.title}`;
        document.getElementById('tourId').value = destId;
        currentBooking = {
            destination: destination.title,
            price: destination.price
        };

        bookingModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    // Open auth modal
    function openAuthModal(tab = 'login') {
        authModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        switchTab(tab);
    }

    // Switch between login/signup tabs
    function switchTab(tab) {
        tabButtons.forEach(btn => {
            if (btn.dataset.tab === tab) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        authForms.forEach(form => {
            if (form.id === `${tab}Form`) {
                form.style.display = 'block';
            } else {
                form.style.display = 'none';
            }
        });
    }

    // Close modal
    function closeModal(modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    // Handle booking form submission
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const bookingDetails = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            date: formData.get('booking-date'),
            participants: formData.get('participants'),
            package: formData.get('package'),
            destination: currentBooking.destination,
            price: currentBooking.price
        };

        // Show confirmation
        showConfirmation(bookingDetails);
        closeModal(bookingModal);
        this.reset();
    });

    // Show confirmation
    function showConfirmation(details) {
        const confirmationDetails = document.getElementById('confirmationDetails');
        confirmationDetails.innerHTML = `
            <p>Thank you, <strong>${details.name}</strong>!</p>
            <p>Your booking for <strong>${details.destination}</strong> on <strong>${details.date}</strong> has been confirmed.</p>
            <p>Package: <strong>${details.package}</strong></p>
            <p>Participants: <strong>${details.participants}</strong></p>
            <p>Total Price: <strong>${details.price}</strong></p>
            <p>A confirmation has been sent to <strong>${details.email}</strong>.</p>
        `;
        
        confirmationModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    // Handle search form
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const destination = document.getElementById('destination').value;
        loadDestinations(destination);
    });

        // Handle newsletter form submission
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input').value;
            alert(`Thank you for subscribing with ${email}! You'll receive our latest offers and updates.`);
            this.reset();
        });
    
        // Event listeners for login/signup buttons
        loginBtn.addEventListener('click', () => openAuthModal('login'));
        signupBtn.addEventListener('click', () => openAuthModal('signup'));
    
        // Event listeners for tab buttons
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                const tab = this.dataset.tab;
                switchTab(tab);
            });
        });
    
        // Event listeners for close buttons
        closeButtons.forEach(button => {
            button.addEventListener('click', function() {
                const modal = this.closest('.modal');
                closeModal(modal);
            });
        });
    
        // Close confirmation modal
        closeConfirmation.addEventListener('click', function() {
            closeModal(confirmationModal);
        });
    
        // Close modal when clicking outside
        window.addEventListener('click', function(e) {
            if (e.target.classList.contains('modal')) {
                closeModal(e.target);
            }
        });
    
        // Simple form validation for auth forms
        document.getElementById('loginForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('#login-email').value;
            const password = this.querySelector('#login-password').value;
            
            if (!email || !password) {
                alert('Please fill in all fields');
                return;
            }
            
            // In a real app, you would send this to a server
            alert('Login successful!');
            closeModal(authModal);
            this.reset();
        });
    
        document.getElementById('signupForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const name = this.querySelector('#signup-name').value;
            const email = this.querySelector('#signup-email').value;
            const password = this.querySelector('#signup-password').value;
            const confirm = this.querySelector('#signup-confirm').value;
            
            if (!name || !email || !password || !confirm) {
                alert('Please fill in all fields');
                return;
            }
            
            if (password !== confirm) {
                alert('Passwords do not match');
                return;
            }
            
            // In a real app, you would send this to a server
            alert('Account created successfully! Please login.');
            switchTab('login');
            this.reset();
        });
    
        // Initialize the page
        loadDestinations();
    });