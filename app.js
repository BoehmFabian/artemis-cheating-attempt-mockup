(function () {
    'use strict';

    var root = document.documentElement;
    var themeKey = 'artemis-cheating-mockup-theme';
    var roleKey = 'artemis-cheating-mockup-role';
    var currentRole = 'staff';
    var roleConfig = {
        staff: { initials: 'AB', name: 'Dr. Anna Bauer', role: 'Instructor · ITP' },
        tutor: { initials: 'AY', name: 'Aylin Yilmaz', role: 'Tutor · ITP' },
    };

    var storage = {
        get: function (key) {
            try {
                return window.localStorage.getItem(key);
            } catch (error) {
                return null;
            }
        },
        set: function (key, value) {
            try {
                window.localStorage.setItem(key, value);
            } catch (error) {
                /* localStorage can be unavailable on file:// in some browsers. */
            }
        },
    };

    currentRole = storage.get(roleKey) === 'tutor' ? 'tutor' : 'staff';

    var initialTheme = storage.get(themeKey) || 'dark';

    function setTheme(theme) {
        root.setAttribute('data-theme', theme);
        storage.set(themeKey, theme);
        document.querySelectorAll('[data-theme-toggle]').forEach(function (button) {
            button.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
        });
    }

    setTheme(initialTheme);

    var ICONS = {
        menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
        search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
        bell: '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M10 21h4"/>',
        sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
        moon: '<path d="M21 12.8A8.5 8.5 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"/>',
        'chevron-down': '<path d="m6 9 6 6 6-6"/>',
        'chevron-up': '<path d="m6 15 6-6 6 6"/>',
        'chevron-left': '<path d="m15 6-6 6 6 6"/>',
        'chevron-right': '<path d="m9 6 6 6-6 6"/>',
        plus: '<path d="M12 5v14M5 12h14"/>',
        'alert-triangle': '<path d="M10.3 3.8 2.2 18a2 2 0 0 0 1.8 3h16a2 2 0 0 0 1.8-3L13.7 3.8a2 2 0 0 0-3.4 0Z"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
        shield: '<path d="M12 3 4.5 6v5.5c0 4.4 3.2 7.8 7.5 9.5 4.3-1.7 7.5-5.1 7.5-9.5V6L12 3Z"/>',
        'shield-check': '<path d="M12 3 4.5 6v5.5c0 4.4 3.2 7.8 7.5 9.5 4.3-1.7 7.5-5.1 7.5-9.5V6L12 3Z"/><path d="m8.5 12 2.2 2.2 4.8-5"/>',
        users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.9"/><path d="M16 3.1a4 4 0 0 1 0 7.8"/>',
        user: '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
        clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
        'map-pin': '<path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
        paperclip: '<path d="m21 11.5-8.5 8.5a5 5 0 0 1-7-7l9-9a3.5 3.5 0 0 1 5 5l-9 9a2 2 0 0 1-3-3l8.5-8.5"/>',
        'file-text': '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6"/><path d="M8 13h8M8 17h6"/>',
        image: '<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="8.5" cy="9.5" r="1.5"/><path d="m21 15-4.5-4.5L7 20"/>',
        video: '<rect x="3" y="5" width="13" height="14" rx="2"/><path d="m16 10 5-3v10l-5-3"/>',
        download: '<path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/>',
        upload: '<path d="M12 21V9"/><path d="m7 14 5-5 5 5"/><path d="M5 3h14"/>',
        eye: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>',
        check: '<path d="m5 12 4.5 4.5L19 7"/>',
        'check-circle': '<circle cx="12" cy="12" r="9"/><path d="m8 12 2.7 2.7L16 9"/>',
        x: '<path d="M6 6l12 12M18 6 6 18"/>',
        'x-circle': '<circle cx="12" cy="12" r="9"/><path d="m9 9 6 6M15 9l-6 6"/>',
        'more-vertical': '<circle cx="12" cy="5" r="1" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1" fill="currentColor" stroke="none"/><circle cx="12" cy="19" r="1" fill="currentColor" stroke="none"/>',
        'arrow-left': '<path d="M19 12H5"/><path d="m11 18-6-6 6-6"/>',
        'arrow-right': '<path d="M5 12h14"/><path d="m13 6 6 6-6 6"/>',
        'arrow-up-right': '<path d="M7 17 17 7"/><path d="M8 7h9v9"/>',
        camera: '<path d="M4 7h3l1.5-2h7L17 7h3a1 1 0 0 1 1 1v11H3V8a1 1 0 0 1 1-1Z"/><circle cx="12" cy="13" r="3.5"/>',
        lock: '<rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
        link: '<path d="M10 13a5 5 0 0 0 7.1.1l2-2a5 5 0 0 0-7.1-7.1l-1.1 1.1"/><path d="M14 11a5 5 0 0 0-7.1-.1l-2 2A5 5 0 0 0 12 20l1.1-1.1"/>',
        'external-link': '<path d="M14 3h7v7"/><path d="M10 14 21 3"/><path d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5"/>',
        edit: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z"/>',
        'graduation-cap': '<path d="m2 9 10-5 10 5-10 5Z"/><path d="M6 11v5c3 2 9 2 12 0v-5"/><path d="M22 9v6"/>',
        flask: '<path d="M9 3h6"/><path d="M10 3v6L5 19a2 2 0 0 0 1.8 3h10.4A2 2 0 0 0 19 19l-5-10V3"/><path d="M7.5 15h9"/>',
        list: '<path d="M8 6h13M8 12h13M8 18h13"/><path d="M3.5 6h.01M3.5 12h.01M3.5 18h.01"/>',
        code: '<path d="m8 8-4 4 4 4M16 8l4 4-4 4M14 5l-4 14"/>',
        target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
        clipboard: '<rect x="5" y="4" width="14" height="18" rx="2"/><path d="M9 4V2h6v2"/><path d="M9 10h6M9 14h6M9 18h4"/>',
        chart: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
        grid: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
        settings: '<path d="M4 6h16M4 12h16M4 18h16"/><circle cx="9" cy="6" r="2" fill="currentColor" stroke="none"/><circle cx="15" cy="12" r="2" fill="currentColor" stroke="none"/><circle cx="7" cy="18" r="2" fill="currentColor" stroke="none"/>',
        'log-out': '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="M16 17l5-5-5-5"/><path d="M21 12H9"/>',
        info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5"/><path d="M12 8h.01"/>',
        'help-circle': '<circle cx="12" cy="12" r="9"/><path d="M9.1 9a3 3 0 1 1 5.8 1c-.8 1.4-2.9 1.7-2.9 3.5"/><path d="M12 17h.01"/>',
        calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/>',
        filter: '<path d="M3 5h18l-7 8v6l-4 2v-8Z"/>',
        refresh: '<path d="M20 11a8 8 0 0 0-14.5-4L3 10"/><path d="M3 5v5h5"/><path d="M4 13a8 8 0 0 0 14.5 4L21 14"/><path d="M21 19v-5h-5"/>',
        play: '<path d="M8 5v14l11-7Z" fill="currentColor" stroke="none"/>',
        message: '<path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4Z"/>',
        send: '<path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>',
        pen: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z"/>',
        save: '<path d="M5 4h11l3 3v13H5Z"/><path d="M8 4v6h7V4"/><path d="M8 20v-5h8v5"/>',
        'book-open': '<path d="M2 4h7a4 4 0 0 1 4 4v13a4 4 0 0 0-4-4H2Z"/><path d="M22 4h-7a4 4 0 0 0-4 4v13a4 4 0 0 1 4-4h7Z"/>',
        sparkles: '<path d="m12 3 1.4 4.1L17.5 8.5 13.4 10 12 14l-1.4-4L6.5 8.5l4.1-1.4Z"/><path d="m19 14 .8 2.2 2.2.8-2.2.8L19 20l-.8-2.2-2.2-.8 2.2-.8Z"/><path d="m5 14 .6 1.4L7 16l-1.4.6L5 18l-.6-1.4L3 16l1.4-.6Z"/>',
        scale: '<path d="M12 3v18"/><path d="M5 7h14"/><path d="m5 7-3 6h6Z"/><path d="m19 7-3 6h6Z"/><path d="M8 21h8"/>',
        ban: '<circle cx="12" cy="12" r="9"/><path d="m5.6 5.6 12.8 12.8"/>',
        'minus-circle': '<circle cx="12" cy="12" r="9"/><path d="M8 12h8"/>',
        hash: '<path d="M10 3 8 21M16 3l-2 18M4 9h16M3 15h16"/>',
        at: '<circle cx="12" cy="12" r="4"/><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8"/>',
        mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
        monitor: '<rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8M12 17v4"/>',
        wifi: '<path d="M5 12.5a10 10 0 0 1 14 0"/><path d="M8.5 16a5 5 0 0 1 7 0"/><path d="M12 19h.01"/>',
        flag: '<path d="M4 21V3"/><path d="M4 4h12l-2 4 2 4H4"/>',
        server: '<rect x="3" y="4" width="18" height="6" rx="2"/><rect x="3" y="14" width="18" height="6" rx="2"/><path d="M7 7h.01M7 17h.01"/>',
        database: '<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v7c0 1.7 3.6 3 8 3s8-1.3 8-3V5"/><path d="M4 12v7c0 1.7 3.6 3 8 3s8-1.3 8-3v-7"/>',
        history: '<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l3 2"/>',
        'corner-down-right': '<path d="M4 5v6a4 4 0 0 0 4 4h12"/><path d="m15 10 5 5-5 5"/>',
        circle: '<circle cx="12" cy="12" r="8"/>',
    };

    function iconMarkup(name) {
        var path = ICONS[name] || ICONS.circle;
        return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' + path + '</svg>';
    }

    function renderIcons(scope) {
        (scope || document).querySelectorAll('[data-icon]').forEach(function (element) {
            if (element.dataset.iconRendered === 'true') {
                return;
            }
            element.innerHTML = iconMarkup(element.dataset.icon);
            element.dataset.iconRendered = 'true';
            element.setAttribute('aria-hidden', 'true');
        });
    }

    renderIcons();

    function setText(selector, value) {
        document.querySelectorAll(selector).forEach(function (element) {
            element.textContent = String(value);
        });
    }

    document.querySelectorAll('[data-theme-toggle]').forEach(function (button) {
        button.addEventListener('click', function () {
            setTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
        });
    });

    var shell = document.querySelector('.app-shell');
    if (shell) {
        document.querySelectorAll('[data-sidebar-toggle]').forEach(function (button) {
            button.addEventListener('click', function () {
                shell.classList.toggle('sidebar-open');
                var open = shell.classList.contains('sidebar-open');
                document.querySelectorAll('[data-sidebar-toggle]').forEach(function (toggle) {
                    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
                });
            });
        });
        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape') {
                shell.classList.remove('sidebar-open');
            }
        });
    }

    function activateTab(tab) {
        var tablist = tab.closest('[role="tablist"]');
        if (!tablist) {
            return;
        }
        var tabs = Array.prototype.slice.call(tablist.querySelectorAll('[role="tab"]'));
        tabs.forEach(function (item) {
            var selected = item === tab;
            item.setAttribute('aria-selected', selected ? 'true' : 'false');
            item.tabIndex = selected ? 0 : -1;
        });
        tabs.forEach(function (item) {
            var panel = document.getElementById(item.getAttribute('aria-controls'));
            if (panel) {
                panel.hidden = item !== tab;
            }
        });
    }

    document.querySelectorAll('[role="tablist"]').forEach(function (tablist) {
        var tabs = Array.prototype.slice.call(tablist.querySelectorAll('[role="tab"]'));
        tabs.forEach(function (tab) {
            tab.addEventListener('click', function () {
                activateTab(tab);
            });
            tab.addEventListener('keydown', function (event) {
                var visibleTabs = tabs.filter(function (item) {
                    return !item.hidden;
                });
                var index = visibleTabs.indexOf(tab);
                var next = null;
                if (event.key === 'ArrowRight') {
                    next = visibleTabs[(index + 1) % visibleTabs.length];
                } else if (event.key === 'ArrowLeft') {
                    next = visibleTabs[(index - 1 + visibleTabs.length) % visibleTabs.length];
                } else if (event.key === 'Home') {
                    next = visibleTabs[0];
                } else if (event.key === 'End') {
                    next = visibleTabs[visibleTabs.length - 1];
                }
                if (next) {
                    event.preventDefault();
                    next.focus();
                    activateTab(next);
                }
            });
        });
        var initial = tabs.filter(function (tab) {
            return tab.getAttribute('aria-selected') === 'true' && !tab.hidden;
        })[0] || tabs.filter(function (tab) {
            return !tab.hidden;
        })[0];
        if (initial) {
            activateTab(initial);
        }
    });

    var toastRegion = null;
    function showToast(message, tone) {
        if (!toastRegion) {
            toastRegion = document.createElement('div');
            toastRegion.className = 'toast-region';
            toastRegion.setAttribute('aria-live', 'polite');
            document.body.appendChild(toastRegion);
        }
        var toast = document.createElement('div');
        toast.className = 'toast toast-' + (tone || 'success');
        toast.innerHTML = '<span class="icon" data-icon="check-circle"></span><span class="toast-message"></span>';
        toast.querySelector('.toast-message').textContent = message;
        toastRegion.appendChild(toast);
        renderIcons(toast);
        window.setTimeout(function () {
            toast.classList.add('toast-out');
            window.setTimeout(function () {
                toast.remove();
            }, 220);
        }, 4200);
    }

    document.querySelectorAll('dialog [data-close-dialog]').forEach(function (button) {
        button.addEventListener('click', function () {
            var dialog = button.closest('dialog');
            if (dialog) {
                dialog.close();
            }
        });
    });

    document.querySelectorAll('dialog').forEach(function (dialog) {
        dialog.addEventListener('click', function (event) {
            if (event.target === dialog) {
                dialog.close();
            }
        });
    });

    /* Dashboard filtering and role-aware counts */
    var dashboardApplyFilters = null;
    var dashboardUpdateMeta = null;
    var caseRows = Array.prototype.slice.call(document.querySelectorAll('[data-case-row]'));
    if (caseRows.length) {
        var searchInput = document.querySelector('[data-case-search]');
        var categorySelect = document.querySelector('[data-category-filter]');
        var quickChips = Array.prototype.slice.call(document.querySelectorAll('[data-quick-filter]'));
        var caseCount = document.querySelector('[data-case-count]');
        var emptyState = document.querySelector('[data-empty-state]');
        var quickFilter = 'all';

        var updateDashboardMeta = function () {
            var tutorMode = currentRole === 'tutor';
            var roleRows = caseRows.filter(function (row) {
                return !tutorMode || row.dataset.ownReport === 'true';
            });
            var statusCounts = { submitted: 0, acknowledged: 0, 'under-review': 0, 'ready-for-decision': 0, confirmed: 0 };
            var evidenceTotal = 0;

            roleRows.forEach(function (row) {
                if (statusCounts[row.dataset.status] !== undefined) {
                    statusCounts[row.dataset.status] += 1;
                }
                evidenceTotal += Number(row.dataset.evidence || 0);
            });

            var openCount = statusCounts.submitted + statusCounts.acknowledged + statusCounts['under-review'];
            setText('[data-stat-value="open"]', openCount);
            setText('[data-stat-value="decision"]', statusCounts['ready-for-decision']);
            setText('[data-stat-value="confirmed"]', statusCounts.confirmed);
            setText('[data-stat-value="evidence"]', evidenceTotal);

            var openParts = [];
            if (statusCounts.submitted) {
                openParts.push('Submitted ' + statusCounts.submitted);
            }
            if (statusCounts.acknowledged) {
                openParts.push('Acknowledged ' + statusCounts.acknowledged);
            }
            if (statusCounts['under-review']) {
                openParts.push('In review ' + statusCounts['under-review']);
            }
            setText('[data-stat-note="open"]', openParts.length ? openParts.join(' · ') : 'No open cases');
            setText('[data-case-total]', roleRows.length);
            setText('[data-nav-badge]', roleRows.length);

            var chipCounts = {
                all: roleRows.length,
                open: openCount,
                decision: statusCounts['ready-for-decision'],
                confirmed: statusCounts.confirmed,
            };
            Object.keys(chipCounts).forEach(function (key) {
                var chipCount = document.querySelector('.chip[data-quick-filter="' + key + '"] span');
                if (chipCount) {
                    chipCount.textContent = String(chipCounts[key]);
                }
            });
        };

        var applyFilters = function () {
            var tutorMode = currentRole === 'tutor';
            var query = (searchInput && searchInput.value ? searchInput.value : '').trim().toLowerCase();
            var category = categorySelect ? categorySelect.value : '';
            var visible = 0;

            caseRows.forEach(function (row) {
                var matchesRole = !tutorMode || row.dataset.ownReport === 'true';
                var matchesSearch = !query || (row.dataset.search || '').indexOf(query) !== -1;
                var matchesCategory = !category || row.dataset.category === category;
                var matchesQuick = true;
                if (quickFilter === 'open') {
                    matchesQuick = ['submitted', 'acknowledged', 'under-review'].indexOf(row.dataset.status) !== -1;
                } else if (quickFilter === 'decision') {
                    matchesQuick = row.dataset.status === 'ready-for-decision';
                } else if (quickFilter === 'confirmed') {
                    matchesQuick = row.dataset.status === 'confirmed';
                }
                var show = matchesRole && matchesSearch && matchesCategory && matchesQuick;
                row.hidden = !show;
                if (show) {
                    visible += 1;
                }
            });

            if (caseCount) {
                caseCount.textContent = String(visible);
            }
            if (emptyState) {
                emptyState.hidden = visible !== 0;
            }
        };

        if (searchInput) {
            searchInput.addEventListener('input', applyFilters);
        }
        if (categorySelect) {
            categorySelect.addEventListener('change', applyFilters);
        }
        quickChips.forEach(function (chip) {
            chip.addEventListener('click', function () {
                quickChips.forEach(function (item) {
                    item.classList.toggle('active', item === chip);
                });
                quickFilter = chip.dataset.quickFilter || 'all';
                applyFilters();
            });
        });
        var clearFilters = document.querySelector('[data-clear-filters]');
        if (clearFilters) {
            clearFilters.addEventListener('click', function () {
                if (searchInput) {
                    searchInput.value = '';
                }
                if (categorySelect) {
                    categorySelect.value = '';
                }
                quickFilter = 'all';
                quickChips.forEach(function (item) {
                    item.classList.toggle('active', item.dataset.quickFilter === 'all');
                });
                applyFilters();
            });
        }

        dashboardApplyFilters = applyFilters;
        dashboardUpdateMeta = updateDashboardMeta;
        updateDashboardMeta();
        applyFilters();
    }

    /* Student search mode */
    var studentModeButtons = Array.prototype.slice.call(document.querySelectorAll('[data-student-mode]'));
    if (studentModeButtons.length) {
        var personSearch = document.querySelector('[data-student-search-person]');
        var seatSearch = document.querySelector('[data-student-search-seat]');
        studentModeButtons.forEach(function (button) {
            button.addEventListener('click', function () {
                var mode = button.dataset.studentMode;
                studentModeButtons.forEach(function (item) {
                    var active = item === button;
                    item.classList.toggle('active', active);
                    item.setAttribute('aria-pressed', active ? 'true' : 'false');
                });
                if (personSearch) {
                    personSearch.hidden = mode !== 'person';
                }
                if (seatSearch) {
                    seatSearch.hidden = mode !== 'seat';
                }
                if (mode === 'seat') {
                    var seatInput = document.getElementById('seat-input');
                    if (seatInput) {
                        seatInput.focus();
                    }
                }
            });
        });
    }

    /* Quick capture */
    var captureForm = document.getElementById('capture-form');
    if (captureForm) {
        var submitDialog = document.getElementById('submit-dialog');
        var fileInput = document.getElementById('file-input');
        document.querySelectorAll('[data-pick-file]').forEach(function (button) {
            button.addEventListener('click', function () {
                if (fileInput) {
                    fileInput.click();
                }
            });
        });
        if (fileInput) {
            fileInput.addEventListener('change', function () {
                var count = fileInput.files ? fileInput.files.length : 0;
                if (count) {
                    showToast(count + ' file' + (count === 1 ? '' : 's') + ' selected. Upload is simulated in this mockup.');
                }
            });
        }
        var saveDraft = document.getElementById('save-draft');
        if (saveDraft) {
            saveDraft.addEventListener('click', function () {
                showToast('Draft saved at 14:32. You can resume it from the dashboard.');
            });
        }
        captureForm.addEventListener('submit', function (event) {
            event.preventDefault();
            if (!captureForm.checkValidity()) {
                captureForm.reportValidity();
                return;
            }
            if (submitDialog) {
                submitDialog.showModal();
            }
        });
    }

    /* Edit report page */
    var editReportForm = document.getElementById('edit-report-form');
    if (editReportForm) {
        var editSavedDialog = document.getElementById('edit-saved-dialog');
        var editFileInput = document.getElementById('edit-file-input');
        var evidenceList = document.querySelector('.evidence-list');

        function bindRemoveEvidence(button) {
            button.addEventListener('click', function () {
                var item = button.closest('.evidence-item');
                if (item) {
                    item.remove();
                    showToast('Evidence removed. Save changes to apply.');
                }
            });
        }

        document.querySelectorAll('[data-remove-evidence]').forEach(bindRemoveEvidence);

        document.querySelectorAll('[data-pick-file]').forEach(function (button) {
            button.addEventListener('click', function () {
                if (editFileInput) {
                    editFileInput.click();
                }
            });
        });

        if (editFileInput) {
            editFileInput.addEventListener('change', function () {
                var files = editFileInput.files ? Array.prototype.slice.call(editFileInput.files) : [];
                files.forEach(function (file) {
                    if (!evidenceList) {
                        return;
                    }
                    var item = document.createElement('article');
                    item.className = 'evidence-item';
                    item.innerHTML = '<div class="evidence-thumb" aria-hidden="true"><span class="thumb-badge">New</span><div class="mock-editor"><div class="mock-editor-bar"><span></span><span></span><span></span><em>New file</em></div><div class="mock-editor-body"><div class="mock-line"><i></i><b></b></div><div class="mock-line"><i class="short"></i><b class="purple"></b></div></div></div></div><div class="evidence-item-body"><strong></strong><p>New evidence · ready to upload</p><div class="evidence-item-meta"></div></div><button class="icon-btn" type="button" aria-label="Remove evidence" data-remove-evidence><span data-icon="x"></span></button>';
                    item.querySelector('strong').textContent = file.name;
                    item.querySelector('.evidence-item-meta').textContent = (file.size / 1024 / 1024).toFixed(1) + ' MB';
                    evidenceList.appendChild(item);
                    renderIcons(item);
                    bindRemoveEvidence(item.querySelector('[data-remove-evidence]'));
                });
                if (files.length) {
                    showToast(files.length + ' file' + (files.length === 1 ? '' : 's') + ' added. Save changes to apply.');
                }
                editFileInput.value = '';
            });
        }

        editReportForm.addEventListener('submit', function (event) {
            event.preventDefault();
            if (!editReportForm.checkValidity()) {
                editReportForm.reportValidity();
                return;
            }
            if (editSavedDialog) {
                editSavedDialog.showModal();
            }
        });
    }

    /* Evidence viewer */
    var evidenceDialog = document.getElementById('evidence-dialog');
    if (evidenceDialog) {
        var evidenceData = {
            photo: {
                name: 'IMG_2041.jpg',
                type: 'JPEG image · 3024 × 1964',
                size: '3.2 MB',
                uploaded: '13 Nov 2026, 14:31',
                by: 'Aylin Yilmaz',
                hash: '9f2c 41ab 7d80 e1f4 6a3b 0c92 55de 8f10',
                description: 'GitHub Copilot chat open with an accepted inline suggestion.',
            },
            video: {
                name: 'VID_2042.mp4',
                type: 'MP4 video · 00:12',
                size: '12.8 MB',
                uploaded: '13 Nov 2026, 14:31',
                by: 'Aylin Yilmaz',
                hash: 'c7d1 8e04 3b2a 91f0 4d77 aa52 6e18 0c39',
                description: 'Screen recording of the active suggestion being accepted.',
            },
        };

        document.querySelectorAll('[data-evidence-kind]').forEach(function (button) {
            button.addEventListener('click', function () {
                var kind = button.dataset.evidenceKind === 'video' ? 'video' : 'photo';
                var data = evidenceData[kind];
                evidenceDialog.dataset.kind = kind;
                var setText = function (id, value) {
                    var element = document.getElementById(id);
                    if (element) {
                        element.textContent = value;
                    }
                };
                setText('evidence-dialog-title', data.name);
                setText('ev-name', data.name);
                setText('ev-type', data.type);
                setText('ev-size', data.size);
                setText('ev-uploaded', data.uploaded);
                setText('ev-by', data.by);
                setText('ev-hash', data.hash);
                setText('ev-description', data.description);
                evidenceDialog.showModal();
            });
        });

        var downloadEvidence = document.getElementById('download-evidence');
        if (downloadEvidence) {
            downloadEvidence.addEventListener('click', function () {
                showToast('Download started. The access was added to the chain of custody.');
            });
        }
    }

    /* Room protocol signing */
    var roomSignDialog = document.getElementById('room-sign-dialog');
    if (roomSignDialog) {
        var roomSignConfirm = document.getElementById('room-sign-confirm');
        var confirmRoomSign = document.getElementById('confirm-room-sign');
        document.querySelectorAll('[data-open-room-sign]').forEach(function (button) {
            button.addEventListener('click', function () {
                roomSignDialog.showModal();
            });
        });
        if (roomSignConfirm && confirmRoomSign) {
            roomSignConfirm.addEventListener('change', function () {
                confirmRoomSign.disabled = !roomSignConfirm.checked;
            });
        }
        if (confirmRoomSign) {
            confirmRoomSign.addEventListener('click', function (event) {
                event.preventDefault();
                roomSignDialog.close();
                var primarySignature = document.querySelector('[data-room-primary-signature]');
                if (primarySignature) {
                    primarySignature.classList.remove('pending');
                    primarySignature.classList.add('signed');
                    var status = primarySignature.querySelector('[data-room-primary-status]');
                    if (status) {
                        status.textContent = 'Signed 16:05 · room protocol version 1';
                    }
                    var icon = primarySignature.querySelector('[data-room-primary-icon]');
                    if (icon) {
                        icon.dataset.icon = 'check-circle';
                        icon.innerHTML = iconMarkup('check-circle');
                    }
                }
                var protocolStatus = document.querySelector('[data-room-protocol-status]');
                if (protocolStatus) {
                    protocolStatus.className = 'status status-warning';
                    protocolStatus.innerHTML = '<span class="status-dot"></span> Awaiting secondary signature';
                }
                var workflowStatus = document.querySelector('[data-workflow-status]');
                if (workflowStatus) {
                    workflowStatus.className = 'status status-success';
                    workflowStatus.innerHTML = '<span class="status-dot"></span> Signed with room protocol';
                }
                var secondaryStatus = document.querySelector('[data-room-secondary-status]');
                if (secondaryStatus) {
                    secondaryStatus.textContent = 'Awaiting co-signature';
                }
                document.querySelectorAll('[data-open-room-sign]').forEach(function (button) {
                    button.disabled = true;
                    button.innerHTML = '<span class="icon" data-icon="check"></span> Protocol signed';
                    renderIcons(button);
                });
                showToast('Room protocol signed. Secondary supervisor notification sent.');
            });
        }
    }

    /* Decision form */
    var decisionForm = document.getElementById('decision-form');
    if (decisionForm) {
        var outcomeInputs = Array.prototype.slice.call(decisionForm.querySelectorAll('input[name="decision-outcome"]'));
        var rationale = document.getElementById('rationale');
        var hearingConfirm = document.getElementById('hearing-confirm');
        var recordDecision = document.getElementById('record-decision');
        var decisionDialog = document.getElementById('decision-dialog');
        var confirmOutcome = document.getElementById('confirm-outcome');
        var confirmDecision = document.getElementById('confirm-decision');

        var updateDecisionButton = function () {
            var hasOutcome = outcomeInputs.some(function (input) {
                return input.checked;
            });
            var hasRationale = rationale && rationale.value.trim().length >= 20;
            var hasHearing = hearingConfirm && hearingConfirm.checked;
            if (recordDecision) {
                recordDecision.disabled = !(hasOutcome && hasRationale && hasHearing);
            }
        };

        outcomeInputs.forEach(function (input) {
            input.addEventListener('change', updateDecisionButton);
        });
        if (rationale) {
            rationale.addEventListener('input', updateDecisionButton);
        }
        if (hearingConfirm) {
            hearingConfirm.addEventListener('change', updateDecisionButton);
        }
        updateDecisionButton();

        decisionForm.addEventListener('submit', function (event) {
            event.preventDefault();
            var selected = outcomeInputs.filter(function (input) {
                return input.checked;
            })[0];
            if (!selected) {
                return;
            }
            if (confirmOutcome) {
                confirmOutcome.textContent = selected.dataset.label || selected.value;
            }
            if (decisionDialog) {
                decisionDialog.showModal();
            }
        });

        if (confirmDecision) {
            confirmDecision.addEventListener('click', function () {
                if (decisionDialog) {
                    decisionDialog.close();
                }
                if (recordDecision) {
                    recordDecision.disabled = true;
                    recordDecision.innerHTML = '<span class="icon" data-icon="check"></span> Decision recorded';
                    renderIcons(recordDecision);
                }
                var status = document.querySelector('[data-case-status]');
                if (status) {
                    status.className = 'status status-success';
                    status.innerHTML = '<span class="status-dot"></span> Closed';
                }
                showToast('Decision recorded. The case is now closed.');
            });
        }
    }

    /* Profile menu and role switch */
    function profileMenuMarkup() {
        var config = roleConfig[currentRole];
        return [
            '<button class="profile-trigger" type="button" data-profile-toggle aria-haspopup="menu" aria-expanded="false">',
            '<span class="avatar avatar-sm" data-profile-avatar>' + config.initials + '</span>',
            '<span class="profile-caret" data-icon="chevron-down"></span>',
            '<span class="sr-only">Open profile menu</span>',
            '</button>',
            '<div class="profile-menu" role="menu" data-profile-menu hidden>',
            '<div class="profile-menu-header">',
            '<span class="avatar avatar-sm" data-profile-menu-avatar>' + config.initials + '</span>',
            '<div><strong data-profile-menu-name>' + config.name + '</strong><small data-profile-menu-role>' + config.role + '</small></div>',
            '</div>',
            '<div class="profile-menu-section">',
            '<span class="profile-menu-label">View as</span>',
            '<button class="profile-menu-item" type="button" role="menuitemradio" data-set-role="staff" aria-checked="true">',
            '<span class="avatar avatar-xs">AB</span><span class="profile-option-copy"><strong>Staff view</strong><small>Instructor / supervisor</small></span><span class="menu-check" data-icon="check"></span>',
            '</button>',
            '<button class="profile-menu-item" type="button" role="menuitemradio" data-set-role="tutor" aria-checked="false">',
            '<span class="avatar avatar-xs">AY</span><span class="profile-option-copy"><strong>Tutor view</strong><small>Aylin Yilmaz · own reports</small></span><span class="menu-check" data-icon="check"></span>',
            '</button>',
            '</div>',
            '<div class="profile-menu-divider"></div>',
            '<button class="profile-menu-item" type="button" role="menuitem" data-profile-action="Account settings are simulated in this mockup."><span data-icon="settings"></span> Account settings</button>',
            '<button class="profile-menu-item" type="button" role="menuitem" data-profile-action="Log out is simulated in this mockup."><span data-icon="log-out"></span> Log out</button>',
            '</div>',
        ].join('');
    }

    function closeProfileMenus() {
        document.querySelectorAll('[data-profile-menu]').forEach(function (menu) {
            menu.hidden = true;
        });
        document.querySelectorAll('[data-profile-toggle]').forEach(function (trigger) {
            trigger.setAttribute('aria-expanded', 'false');
        });
    }

    function applyRole() {
        var tutorMode = currentRole === 'tutor';
        var config = roleConfig[currentRole];
        if (tutorMode && document.body.dataset.requiresStaff === 'true') {
            window.location.replace('index.html');
            return;
        }
        document.body.classList.toggle('role-tutor', tutorMode);
        document.body.dataset.role = currentRole;

        document.querySelectorAll('[data-profile-avatar], [data-profile-menu-avatar], [data-user-avatar]').forEach(function (element) {
            element.textContent = config.initials;
        });
        document.querySelectorAll('[data-profile-menu-name], [data-user-name]').forEach(function (element) {
            element.textContent = config.name;
        });
        document.querySelectorAll('[data-profile-menu-role], [data-user-role]').forEach(function (element) {
            element.textContent = config.role;
        });
        document.querySelectorAll('[data-staff-only]').forEach(function (element) {
            element.hidden = tutorMode;
        });
        document.querySelectorAll('[data-tutor-only]').forEach(function (element) {
            element.hidden = !tutorMode;
        });
        document.querySelectorAll('[data-set-role]').forEach(function (element) {
            element.setAttribute('aria-checked', element.dataset.setRole === currentRole ? 'true' : 'false');
        });
        document.querySelectorAll('[data-staff-tab]').forEach(function (element) {
            if (element.getAttribute('role') === 'tab') {
                element.hidden = tutorMode;
            } else if (tutorMode) {
                element.hidden = true;
            }
        });
        if (tutorMode) {
            var selectedTab = document.querySelector('[role="tab"][aria-selected="true"]');
            if (selectedTab && selectedTab.hidden) {
                var summaryTab = document.querySelector('[role="tab"][data-tab="summary"]');
                if (summaryTab) {
                    summaryTab.click();
                }
            }
        }

        if (dashboardUpdateMeta) {
            dashboardUpdateMeta();
        }
        if (dashboardApplyFilters) {
            dashboardApplyFilters();
        } else {
            setText('[data-nav-badge]', tutorMode ? 2 : 4);
        }
    }

    function setRole(role) {
        currentRole = role === 'tutor' ? 'tutor' : 'staff';
        storage.set(roleKey, currentRole);
        applyRole();
        closeProfileMenus();
        showToast(currentRole === 'tutor' ? 'Tutor view: you see only reports you created.' : 'Staff view: all cases in this exam.');
    }

    document.querySelectorAll('[data-profile-menu-root]').forEach(function (menuRoot) {
        menuRoot.innerHTML = profileMenuMarkup();
        renderIcons(menuRoot);
        var trigger = menuRoot.querySelector('[data-profile-toggle]');
        var menu = menuRoot.querySelector('[data-profile-menu]');
        if (trigger && menu) {
            trigger.addEventListener('click', function (event) {
                event.stopPropagation();
                var shouldOpen = menu.hidden;
                closeProfileMenus();
                menu.hidden = !shouldOpen;
                trigger.setAttribute('aria-expanded', shouldOpen ? 'true' : 'false');
            });
        }
        menuRoot.querySelectorAll('[data-set-role]').forEach(function (button) {
            button.addEventListener('click', function () {
                setRole(button.dataset.setRole);
            });
        });
        menuRoot.querySelectorAll('[data-profile-action]').forEach(function (button) {
            button.addEventListener('click', function () {
                showToast(button.dataset.profileAction);
                closeProfileMenus();
            });
        });
    });

    document.addEventListener('click', function (event) {
        if (!event.target.closest('[data-profile-menu-root]')) {
            closeProfileMenus();
        }
    });

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            closeProfileMenus();
        }
    });

    applyRole();

    /* Simulated secondary actions */
    document.querySelectorAll('[data-demo-action]').forEach(function (button) {
        button.addEventListener('click', function () {
            showToast(button.dataset.demoAction || 'This action is simulated in the mockup.');
        });
    });

    document.querySelectorAll('a[href="#"]').forEach(function (link) {
        link.addEventListener('click', function (event) {
            event.preventDefault();
        });
    });
})();
