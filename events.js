// ===========================================
// EVENTS DATABASE
// ===========================================
const events = [
    {
        id: 1,
        title: "Sunday Worship Service",
        date: "2026-02-16",
        time: "8:00 AM",
        location: "TSTC Airstrip Mayodassa, Jalingo",
        description: "Powerful worship, life-changing word, and fellowship. All are welcome!",
        type: "service",
        featured: true,
        color: "darkred"
    },
    {
        id: 2,
        title: "Bible Study",
        date: "2026-02-18",
        time: "5:00 PM",
        location: "Taraba state",
        description: "Deep dive into Scripture with practical application for daily living.",
        type: "study",
        featured: true,
        color: "orange"
    },
    {
        id: 3,
        title: "Prayer Meeting",
        date: "2026-02-21",
        time: "5:00 PM",
        location: "Taraba State",
        description: "Corporate prayer, intercession, and spiritual warfare for breakthroughs.",
        type: "prayer",
        featured: true,
        color: "skyblue"
    },
  {
    id: 4,
    title: "LG. Fasting and Prayer",
    date: "2026-02-23",
    time: "10:00 AM",
    location: "Jalingo",
    description: "🙏 Local Government fasting and prayer program. Join us as we pray for Program/Conference, for Jalingo LGA, our leaders, peace, and spiritual revival. Together we seek God's face for our community.",
    type: "prayer",
    featured: false,
    color: "darkred"
    },
    {
        id: 5,
        title: "Men's Forum",
        date: "2026-02-28",
        time: "9:00 AM",
        location: "ATC church Main Auditorium",
        description: "Empowering men to lead with integrity, purpose, and godly character.",
        type: "conference",
        featured: true,
        color: "darkred"
    },
    {
    id: 6,
    title: "Prayer of Destiny Conference",
    date: "2026-03-05",
    time: "6:00 PM",
    location: "Main Church - TSTC Airstrip Mayodassa, Jalingo",
    description: "📅 4-DAY PROGRAM: March 5-8, 2026 (6:00 PM daily)\n\nA transformative 4-day journey to discover and fulfill your God-given destiny. Each evening features powerful teaching, practical workshops, and personal ministry.",
    type: "conference",
    featured: true,
    color: "darkred"
},
    {
        id: 9,
        title: "Discipleship Class",
        date: "2026-03-15",
        time: "04:00 PM",
        location: "Main church - TSTC Airstrip, Mayo-Dassa, Jalingo",
        description: "Training for ministry leaders and volunteers.",
        type: "training",
        featured: false,
        color: "purple"
    },
    {
        id: 10,
        title: "Easter Sunday",
        date: "2026-04-05",
        time: "8:00 AM",
        location: "All Branches",
        description: "Celebrating the resurrection of our Lord Jesus Christ.",
        type: "special",
        featured: true,
        color: "gold"
    }
];

// ===========================================
// DOM ELEMENTS
// ===========================================
const navBars = document.querySelectorAll('.nav');
const monthYearEl = document.getElementById('monthYear');
const calendarGrid = document.getElementById('calendarView');
const listView = document.getElementById('listView');
const featuredEvents = document.getElementById('featuredEvents');
const calendarViewBtn = document.getElementById('calendarViewBtn');
const listViewBtn = document.getElementById('listViewBtn');
const prevMonthBtn = document.getElementById('prevMonth');
const nextMonthBtn = document.getElementById('nextMonth');
const eventModal = document.getElementById('eventModal');
const modalTitle = document.getElementById('modalTitle');
const modalBody = document.getElementById('modalBody');
const reminderModal = document.getElementById('reminderModal');

// ===========================================
// STATE
// ===========================================
let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();
let selectedEventId = null;

// ===========================================
// NAVIGATION ACTIVE STATE
// ===========================================
if (navBars.length > 0) {
    navBars.forEach(nav => {
        nav.onclick = () => {
            navBars.forEach(nv => nv.classList.remove('active'));
            nav.classList.add('active');
        };
    });
}

// ===========================================
// CALENDAR RENDERING
// ===========================================
const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function renderCalendar() {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'];
    
    if (monthYearEl) {
        monthYearEl.textContent = `${monthNames[currentMonth]} ${currentYear}`;
    }
    
    // Get first day of month and total days
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    
    // Clear calendar
    if (calendarGrid) {
        calendarGrid.innerHTML = '';
        
        // Add weekday headers
        weekdays.forEach(day => {
            const weekdayEl = document.createElement('div');
            weekdayEl.className = 'weekday';
            weekdayEl.textContent = day;
            calendarGrid.appendChild(weekdayEl);
        });
        
        // Add empty cells for days before month starts
        for (let i = 0; i < firstDay; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'calendar-day';
            emptyDay.style.background = '#f5f5f5';
            emptyDay.style.minHeight = '100px';
            calendarGrid.appendChild(emptyDay);
        }
        
        // Add days of month
        const today = new Date();
        const todayDate = today.getDate();
        const todayMonth = today.getMonth();
        const todayYear = today.getFullYear();
        
        for (let day = 1; day <= daysInMonth; day++) {
            const dayEl = document.createElement('div');
            dayEl.className = 'calendar-day';
            dayEl.style.minHeight = '100px';
            dayEl.style.position = 'relative';
            
            // Check if today
            if (day === todayDate && currentMonth === todayMonth && currentYear === todayYear) {
                dayEl.classList.add('today');
            }
            
            // Format date string for comparison
            const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            
            // Check for events on this day
            const dayEvents = events.filter(event => event.date === dateStr);
            
            if (dayEvents.length > 0) {
                dayEl.classList.add('has-event');
            }
            
            // Day number
            const dayNumber = document.createElement('div');
            dayNumber.className = 'day-number';
            dayNumber.style.display = 'flex';
            dayNumber.style.justifyContent = 'space-between';
            dayNumber.style.marginBottom = '8px';
            dayNumber.innerHTML = `<span style="font-weight: bold;">${day}</span> ${dayEvents.length > 0 ? '<span class="event-indicator" style="display: inline-block; width: 8px; height: 8px; background: orange; border-radius: 50%;"></span>' : ''}`;
            dayEl.appendChild(dayNumber);
            
            // Show first event preview
            if (dayEvents.length > 0) {
                const preview = document.createElement('div');
                preview.className = 'event-preview';
                preview.textContent = dayEvents[0].title;
                preview.style.fontSize = '0.8rem';
                preview.style.color = 'darkred';
                preview.style.background = 'rgba(255,165,0,0.1)';
                preview.style.padding = '4px 8px';
                preview.style.borderRadius = '4px';
                preview.style.marginTop = '5px';
                preview.style.whiteSpace = 'nowrap';
                preview.style.overflow = 'hidden';
                preview.style.textOverflow = 'ellipsis';
                preview.style.cursor = 'pointer';
                preview.onclick = (e) => {
                    e.stopPropagation();
                    showEventDetails(dayEvents[0]);
                };
                dayEl.appendChild(preview);
                
                if (dayEvents.length > 1) {
                    const more = document.createElement('div');
                    more.className = 'event-preview';
                    more.style.fontSize = '0.8rem';
                    more.style.background = 'rgba(135,206,235,0.1)';
                    more.style.padding = '4px 8px';
                    more.style.borderRadius = '4px';
                    more.style.marginTop = '3px';
                    more.style.cursor = 'pointer';
                    more.textContent = `+${dayEvents.length - 1} more`;
                    more.onclick = (e) => {
                        e.stopPropagation();
                        showDayEvents(dayEvents);
                    };
                    dayEl.appendChild(more);
                }
            }
            
            dayEl.onclick = () => {
                if (dayEvents.length > 0) {
                    showDayEvents(dayEvents);
                }
            };
            
            calendarGrid.appendChild(dayEl);
        }
    }
}

// ===========================================
// EVENTS LIST RENDERING
// ===========================================
function renderEventsList() {
    if (!listView) return;
    
    // Sort events by date
    const sortedEvents = [...events].sort((a, b) => new Date(a.date) - new Date(b.date));
    
    listView.innerHTML = '';
    
    sortedEvents.forEach(event => {
        const eventDate = new Date(event.date);
        const day = eventDate.getDate();
        const month = eventDate.toLocaleString('default', { month: 'short' });
        
        const eventCard = document.createElement('div');
        eventCard.className = 'event-card';
        eventCard.style.background = 'white';
        eventCard.style.borderRadius = '15px';
        eventCard.style.padding = '25px';
        eventCard.style.marginBottom = '20px';
        eventCard.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
        eventCard.style.display = 'flex';
        eventCard.style.gap = '25px';
        eventCard.style.alignItems = 'center';
        eventCard.style.transition = 'all 0.3s';
        eventCard.style.borderLeft = '6px solid transparent';
        
        eventCard.innerHTML = `
            <div class="event-date" style="background: linear-gradient(60deg, red, orange); color: white; padding: 15px; border-radius: 12px; text-align: center; min-width: 100px;">
                <div style="font-size: 2rem; font-weight: bold; line-height: 1;">${day}</div>
                <div style="font-size: 1.1rem; text-transform: uppercase;">${month}</div>
            </div>
            <div class="event-details" style="flex: 1;">
                <h3 style="color: darkred; margin-bottom: 10px; font-size: 1.4rem;">${event.title}</h3>
                <div class="event-meta" style="display: flex; gap: 20px; color: #666; margin: 10px 0; flex-wrap: wrap;">
                    <span><i class="fas fa-clock" style="color: skyblue; margin-right: 5px;"></i> ${event.time}</span>
                    <span><i class="fas fa-map-marker-alt" style="color: skyblue; margin-right: 5px;"></i> ${event.location}</span>
                </div>
                <div class="event-description" style="color: #555; line-height: 1.6;">${event.description}</div>
                <div class="event-actions" style="display: flex; gap: 10px; margin-top: 15px;">
                    <button class="event-btn" onclick='showEventDetails(${JSON.stringify(event).replace(/'/g, "\\'")})' style="background: skyblue; color: white; border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer; font-weight: 600; display: flex; align-items: center; gap: 8px;">
                        <i class="fas fa-info-circle"></i> Details
                    </button>
                    <button class="event-btn secondary" onclick="openReminderModal(${event.id})" style="background: white; color: darkred; border: 2px solid skyblue; padding: 10px 20px; border-radius: 8px; cursor: pointer; font-weight: 600; display: flex; align-items: center; gap: 8px;">
                        <i class="fas fa-bell"></i> Remind Me
                    </button>
                </div>
            </div>
        `;
        
        listView.appendChild(eventCard);
    });
}

// ===========================================
// FEATURED EVENTS RENDERING
// ===========================================
function renderFeaturedEvents() {
    if (!featuredEvents) return;
    
    const featured = events.filter(event => event.featured === true).slice(0, 3);
    
    featuredEvents.innerHTML = '';
    
    featured.forEach(event => {
        const eventDate = new Date(event.date);
        const formattedDate = eventDate.toLocaleDateString('en-US', { 
            weekday: 'short', 
            month: 'short', 
            day: 'numeric' 
        });
        
        const card = document.createElement('div');
        card.className = 'upcoming-card';
        card.style.background = 'white';
        card.style.borderRadius = '15px';
        card.style.padding = '25px';
        card.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
        card.style.transition = 'all 0.3s';
        card.style.position = 'relative';
        card.style.overflow = 'hidden';
        
        card.innerHTML = `
            <div style="position: absolute; top: 0; left: 0; width: 100%; height: 5px; background: linear-gradient(90deg, red, orange);"></div>
            <div class="upcoming-date" style="color: orange; font-weight: bold; margin-bottom: 15px;">
                <i class="fas fa-calendar"></i> ${formattedDate} • ${event.time}
            </div>
            <h3 style="color: darkred; margin-bottom: 15px; font-size: 1.3rem;">${event.title}</h3>
            <p style="color: #666; margin-bottom: 15px;">${event.description}</p>
            <p style="color: #888; margin-bottom: 15px;">
                <i class="fas fa-map-marker-alt"></i> ${event.location}
            </p>
            <button class="event-btn" style="width: 100%; background: skyblue; color: white; border: none; padding: 12px; border-radius: 8px; cursor: pointer; font-weight: 600;" onclick='showEventDetails(${JSON.stringify(event).replace(/'/g, "\\'")})'>
                Learn More
            </button>
        `;
        
        featuredEvents.appendChild(card);
    });
}

// ===========================================
// MODAL FUNCTIONS
// ===========================================
window.showEventDetails = function(event) {
    const eventDate = new Date(event.date);
    const formattedDate = eventDate.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    
    if (modalTitle) modalTitle.textContent = event.title;
    
    if (modalBody) {
        modalBody.innerHTML = `
            <div style="text-align: center; margin-bottom: 20px;">
                <span style="background: ${event.color || 'skyblue'}; color: white; padding: 4px 12px; border-radius: 20px; font-size: 0.9rem; display: inline-block; text-transform: capitalize;">
                    ${event.type}
                </span>
            </div>
            <div style="margin-bottom: 25px;">
                <p style="margin: 15px 0; font-size: 1.1rem;">
                    <i class="fas fa-calendar" style="color: skyblue; width: 25px; display: inline-block;"></i>
                    ${formattedDate}
                </p>
                <p style="margin: 15px 0; font-size: 1.1rem;">
                    <i class="fas fa-clock" style="color: skyblue; width: 25px; display: inline-block;"></i>
                    ${event.time}
                </p>
                <p style="margin: 15px 0; font-size: 1.1rem;">
                    <i class="fas fa-map-marker-alt" style="color: skyblue; width: 25px; display: inline-block;"></i>
                    ${event.location}
                </p>
            </div>
            <div style="border-top: 2px solid #eee; padding-top: 20px; margin-bottom: 25px;">
                <h4 style="color: darkred; margin-bottom: 15px;">About this Event</h4>
                <p style="color: #555; line-height: 1.8;">${event.description}</p>
            </div>
            <button class="event-btn" style="width: 100%; background: linear-gradient(60deg, red, orange); color: white; border: none; padding: 15px; border-radius: 8px; cursor: pointer; font-weight: 600;" onclick="openReminderModal(${event.id})">
                <i class="fas fa-bell"></i> Set Reminder
            </button>
        `;
    }
    
    if (eventModal) {
        eventModal.style.display = 'flex';
    }
};

window.showDayEvents = function(dayEvents) {
    if (modalTitle) modalTitle.textContent = `Events on ${dayEvents[0].date}`;
    
    let html = '';
    dayEvents.forEach(event => {
        html += `
            <div style="border-bottom: 1px solid #eee; padding: 20px 0;">
                <h3 style="color: darkred; margin-bottom: 10px;">${event.title}</h3>
                <p style="margin: 8px 0;"><i class="fas fa-clock" style="color: skyblue; width: 20px;"></i> ${event.time}</p>
                <p style="margin: 8px 0;"><i class="fas fa-map-marker-alt" style="color: skyblue; width: 20px;"></i> ${event.location}</p>
                <p style="margin: 15px 0; color: #555;">${event.description}</p>
                <button class="event-btn" style="background: skyblue; color: white; border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer; margin-top: 10px;" onclick="openReminderModal(${event.id})">
                    <i class="fas fa-bell"></i> Remind Me
                </button>
            </div>
        `;
    });
    
    if (modalBody) modalBody.innerHTML = html;
    if (eventModal) eventModal.style.display = 'flex';
};

window.closeModal = function() {
    if (eventModal) eventModal.style.display = 'none';
};

// ===========================================
// REMINDER FUNCTIONS
// ===========================================
window.openReminderModal = function(eventId) {
    selectedEventId = eventId;
    if (reminderModal) reminderModal.style.display = 'flex';
};

window.closeReminderModal = function() {
    if (reminderModal) reminderModal.style.display = 'none';
};

window.setReminder = function() {
    const name = document.getElementById('reminderName');
    const email = document.getElementById('reminderEmail');
    
    if (!name || !email) return;
    
    if (!name.value || !email.value) {
        alert('❌ Please enter your name and email');
        return;
    }
    
    const event = events.find(e => e.id === selectedEventId);
    
    if (event) {
        alert(`✅ Reminder set for ${event.title}!\n\nWe'll send you a reminder 1 hour before the event.`);
        
        // Clear form
        name.value = '';
        email.value = '';
        const phone = document.getElementById('reminderPhone');
        if (phone) phone.value = '';
    }
    
    closeReminderModal();
};

// ========
// LOGO PREVIEW
// ===========================================
const logo = document.querySelector('.aflame');
const logoModal = document.getElementById('logoModal');

window.closeLogoModal = function() {
  if (logoModal) logoModal.style.display = 'none';
};

if (logo && logoModal) {
  logo.onclick = () => {
    logoModal.style.display = 'flex';
  };
}

// ===========================================
// VIEW TOGGLE
// ====================