// Products page functionality
document.addEventListener('DOMContentLoaded', () => {
    // Filter toggle for mobile
    const filtersToggle = document.querySelector('.filters-toggle');
    const filtersSidebar = document.querySelector('.filters-sidebar');
    
    if (filtersToggle && filtersSidebar) {
        filtersToggle.addEventListener('click', () => {
            filtersSidebar.classList.toggle('active');
        });
    }

    // View toggle
    const viewBtns = document.querySelectorAll('.view-btn');
    const productsGrid = document.getElementById('productsGrid');
    
    viewBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            viewBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const view = btn.dataset.view;
            if (view === 'list') {
                productsGrid.classList.add('list-view');
            } else {
                productsGrid.classList.remove('list-view');
            }
        });
    });

    // Size filter
    const sizeBtns = document.querySelectorAll('.size-btn');
    sizeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            btn.classList.toggle('active');
        });
    });

    // Color filter
    const colorBtns = document.querySelectorAll('.color-btn');
    colorBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            colorBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    // Clear filters
    const clearFiltersBtn = document.querySelector('.clear-filters-btn');
    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', () => {
            document.querySelectorAll('.filter-option input[type="checkbox"]').forEach(cb => {
                cb.checked = false;
            });
            sizeBtns.forEach(btn => btn.classList.remove('active'));
            colorBtns.forEach(btn => btn.classList.remove('active'));
        });
    }
});