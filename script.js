document.addEventListener('DOMContentLoaded', () => {

    // Market Mover Data Simulation
    const marketData = [
        { symbol: "BTC", name: "Bitcoin", price: 64230.50, change: 1.45, vol: "42.1B", icon: "₿" },
        { symbol: "ETH", name: "Ethereum", price: 3450.20, change: 2.4, vol: "14.2B", icon: "Ξ" },
        { symbol: "AAPL", name: "Apple", price: 173.50, change: -1.2, vol: "82.4M", icon: "" },
        { symbol: "NVDA", name: "NVIDIA", price: 875.20, change: 4.1, vol: "120M", icon: "N" },
        { symbol: "XAU", name: "Gold", price: 2154.30, change: 0.8, vol: "15.3M", icon: "Au" },
        { symbol: "WTI", name: "Crude Oil", price: 82.15, change: -0.5, vol: "24.1M", icon: "🛢️" },
        { symbol: "EURUSD", name: "Euro / US Dollar", price: 1.0924, change: 0.12, vol: "3.4B", icon: "€" },
        { symbol: "GBPUSD", name: "British Pound / US Dollar", price: 1.2641, change: -0.05, vol: "2.1B", icon: "£" },
        { symbol: "USDJPY", name: "US Dollar / Japanese Yen", price: 147.85, change: 0.35, vol: "4.5B", icon: "¥" }
    ];

    const tbody = document.getElementById('market-tbody');

    if (tbody) {
        marketData.forEach(asset => {
            const tr = document.createElement('tr');

            const isPos = asset.change >= 0;
            const changeHtml = `<td class="${isPos ? 'positive' : 'negative'}">
                ${isPos ? '+' : ''}${asset.change}%
            </td>`;

            tr.innerHTML = `
                <td>
                    <div class="m-asset">
                        <div class="m-icon">${asset.icon}</div>
                        <div>
                            <div>${asset.name}</div>
                            <div style="font-size:0.8rem;color:var(--text-secondary)">${asset.symbol}</div>
                        </div>
                    </div>
                </td>
                <td>$${asset.price.toFixed(2)}</td>
                ${changeHtml}
                <td style="color:var(--text-secondary)">${asset.vol}</td>
                <td><button class="m-trade-btn">Trade</button></td>
            `;
            tbody.appendChild(tr);
        });
    }

    // Timeframe filters toggle
    const tBtns = document.querySelectorAll('.t-btn');
    tBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Re-animate the simulated chart SVG just for effect
            const path = document.querySelector('.data-line');
            if (path) {
                path.style.animation = 'none';
                path.offsetHeight; /* trigger reflow */
                path.style.animation = null;
            }
        });
    });

    // Simple interaction for the Quick Trade Tabs
    const tradeTabs = document.querySelectorAll('.trade-tab');
    const executeBtn = document.querySelector('.execute-btn');

    tradeTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tradeTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            if (tab.innerText === 'Sell') {
                executeBtn.innerText = 'Sell BTC';
                executeBtn.className = 'execute-btn negative';
                executeBtn.style.backgroundColor = 'var(--vibrant-red)';
                executeBtn.style.color = 'white';
            } else if (tab.innerText === 'Buy') {
                executeBtn.innerText = 'Buy BTC';
                executeBtn.className = 'execute-btn bg-vibrant-green';
                executeBtn.style.backgroundColor = '';
            } else {
                executeBtn.innerText = 'Convert BTC';
                executeBtn.className = 'execute-btn';
                executeBtn.style.backgroundColor = 'var(--text-primary)';
                executeBtn.style.color = 'white';
            }
        });
    });

    // Navigation View Routing Logic
    const navItems = document.querySelectorAll('.nav-links li, .settings-btn');
    const views = document.querySelectorAll('.view-content');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remove active state from all nav items
            document.querySelectorAll('.nav-links li').forEach(nav => nav.classList.remove('active'));

            // Add active state to clicked item (if it's a list item)
            if (item.tagName.toLowerCase() === 'li') {
                item.classList.add('active');
            }

            // Hide all views
            views.forEach(view => {
                view.style.display = 'none';
                view.classList.remove('active');
            });

            // Show target view
            const targetId = item.getAttribute('data-target');
            if (targetId) {
                const targetView = document.getElementById(targetId);
                if (targetView) {
                    targetView.style.display = 'block';
                    targetView.classList.add('active');
                }
            }
        });
    });

});
