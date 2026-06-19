import React, { useState } from 'react';
import { ShoppingCart, Store, Plus, Minus, Trash2 } from 'lucide-react';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [authForm, setAuthForm] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [cart, setCart] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [paymentMessage, setPaymentMessage] = useState('');
  const [purchaseHistory, setPurchaseHistory] = useState([]);

  const categories = [
    { id: 'all', label: 'Semua', emoji: '📋' },
    { id: 'makanan', label: 'Makanan', emoji: '🍽️' },
    { id: 'minuman', label: 'Minuman', emoji: '🥤' },
    { id: 'snack', label: 'Snack', emoji: '🍿' },
  ];

  const menuItems = {
    makanan: [
      { id: 1, name: 'Nasi Goreng', price: 15000, icon: '🍛' },
      { id: 2, name: 'Mie Ayam', price: 12000, icon: '🍜' },
      { id: 3, name: 'Bakso', price: 10000, icon: '🍲' },
      { id: 4, name: 'Sate Ayam', price: 20000, icon: '🍢' },
      { id: 13, name: 'Ayam Bakar', price: 22000, icon: '🍗' },
      { id: 14, name: 'Nasi Uduk', price: 12000, icon: '🍱' },
      { id: 15, name: 'Mie Goreng', price: 13000, icon: '🍝' },
      { id: 16, name: 'Pecel Lele', price: 18000, icon: '🐟' },
      { id: 17, name: 'Soto Ayam', price: 14000, icon: '🥣' },
      { id: 18, name: 'Lalapan Ayam', price: 20000, icon: '🥗' },
      { id: 19, name: 'Rawon', price: 17000, icon: '🍲' },
      { id: 20, name: 'Capcay', price: 16000, icon: '🥦' },
    ],
    minuman: [
      { id: 5, name: 'Es Teh', price: 5000, icon: '🧋' },
      { id: 6, name: 'Jus Jeruk', price: 8000, icon: '🍊' },
      { id: 7, name: 'Kopi', price: 7000, icon: '☕' },
      { id: 8, name: 'Milkshake', price: 12000, icon: '🥤' },
    ],
    snack: [
      { id: 9, name: 'Kentang Goreng', price: 8000, icon: '🍟' },
      { id: 10, name: 'Pisang Goreng', price: 6000, icon: '🍌' },
      { id: 11, name: 'Roti Bakar', price: 7000, icon: '🍞' },
      { id: 12, name: 'Donut', price: 5000, icon: '🍩' },
    ]
  };

  const allItems = [...menuItems.makanan, ...menuItems.minuman, ...menuItems.snack];
  const filteredItems = activeCategory === 'all' ? allItems : menuItems[activeCategory] || [];
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const addToCart = (item) => {
    const existing = cart.find(i => i.id === item.id);
    if (existing) {
      setCart(cart.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    const existing = cart.find(i => i.id === id);
    if (!existing) return;
    if (existing.quantity === 1) {
      setCart(cart.filter(i => i.id !== id));
    } else {
      setCart(cart.map(i => i.id === id ? { ...i, quantity: i.quantity - 1 } : i));
    }
  };

  const deleteItem = (id) => {
    setCart(cart.filter(i => i.id !== id));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(number);
  };

  const formatDateTime = (value) => {
    return new Intl.DateTimeFormat('id-ID', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(new Date(value));
  };

  const qrisModules = [
    [1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1],
    [0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0],
    [1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0],
    [1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1],
  ];

  const handleAuthChange = (event) => {
    const { name, value } = event.target;
    setAuthForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleAuthSubmit = (event) => {
    event.preventDefault();
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCart([]);
    setActiveCategory('all');
    setPaymentMethod('cash');
    setPaymentMessage('');
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      setPaymentMessage('Keranjang masih kosong. Pilih menu dulu.');
      return;
    }

    const orderItems = cart.map((item) => ({
      id: item.id,
      name: item.name,
      quantity: item.quantity,
      price: item.price,
      icon: item.icon,
    }));

    const orderTotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const orderRecord = {
      id: `WRG-${Date.now()}`,
      paymentMethod,
      total: orderTotal,
      itemCount: orderItems.reduce((sum, item) => sum + item.quantity, 0),
      timestamp: new Date().toISOString(),
      status: paymentMethod === 'cash' ? 'Menunggu pembayaran kasir' : 'Menunggu scan QRIS',
      items: orderItems,
    };

    setPurchaseHistory((current) => [orderRecord, ...current]);

    if (paymentMethod === 'cash') {
      setPaymentMessage('Pesanan dikirim ke kasir. Silakan bayar tunai di kasir saat pesanan selesai diproses.');
    } else {
      setPaymentMessage('QRIS siap dipindai. Tunjukkan layar ini untuk pembayaran digital.');
    }

    setCart([]);
  };

  const historySummary = {
    transactionCount: purchaseHistory.length,
    totalSpent: purchaseHistory.reduce((sum, order) => sum + order.total, 0),
    cashCount: purchaseHistory.filter((order) => order.paymentMethod === 'cash').length,
    qrisCount: purchaseHistory.filter((order) => order.paymentMethod === 'qris').length,
  };

  if (!isAuthenticated) {
    return (
      <div className="app-shell auth-shell">
        <div className="ambient ambient-left" />
        <div className="ambient ambient-right" />

        <main className="auth-layout">
          <section className="auth-marketing">
            <div className="brand-block auth-brand-block">
              <div className="brand-icon">
                <Store className="brand-store-icon" />
              </div>
              <div>
                <p className="brand-eyebrow">Selamat datang</p>
                <h1>WarungQ New</h1>
              </div>
            </div>

            <div className="auth-highlight">
              <span className="hero-pill">Sistem kasir modern</span>
            </div>

          </section>

          <section className="auth-card">
            <div className="auth-tabs">
              <button
                type="button"
                className={authMode === 'login' ? 'active' : ''}
                onClick={() => setAuthMode('login')}
              >
                Login
              </button>
              <button
                type="button"
                className={authMode === 'register' ? 'active' : ''}
                onClick={() => setAuthMode('register')}
              >
                Daftar
              </button>
            </div>

            <form className="auth-form" onSubmit={handleAuthSubmit}>
              <div className="auth-form-header">
                <p>{authMode === 'login' ? 'Masuk ke akun' : 'Buat akun baru'}</p>
                <h3>{authMode === 'login' ? 'Login ke dashboard' : 'Daftar untuk mulai memakai WarungQ'}</h3>
              </div>

              {authMode === 'register' && (
                <label className="auth-field">
                  <span>Nama lengkap</span>
                  <input
                    name="name"
                    type="text"
                    placeholder="Contoh: Dinda Pratama"
                    value={authForm.name}
                    onChange={handleAuthChange}
                    autoComplete="name"
                  />
                </label>
              )}

              <label className="auth-field">
                <span>Email</span>
                <input
                  name="email"
                  type="email"
                  placeholder="nama@email.com"
                  value={authForm.email}
                  onChange={handleAuthChange}
                  autoComplete="email"
                />
              </label>

              <label className="auth-field">
                <span>Password</span>
                <input
                  name="password"
                  type="password"
                  placeholder="Masukkan password"
                  value={authForm.password}
                  onChange={handleAuthChange}
                  autoComplete={authMode === 'login' ? 'current-password' : 'new-password'}
                />
              </label>

              <button className="auth-submit" type="submit">
                {authMode === 'login' ? 'Masuk Sekarang' : 'Buat Akun'}
              </button>

              <p className="auth-hint">
                {authMode === 'login'
                  ? 'Belum punya akun? Pindah ke tab Daftar.'
                  : 'Sudah punya akun? Pindah ke tab Login.'}
              </p>
            </form>
          </section>
        </main>
      </div>
    );
  }

  return (
    <div className="app-shell">
      <div className="ambient ambient-left" />
      <div className="ambient ambient-right" />

      <header className="topbar">
        <div className="brand-block">
          <div className="brand-icon">
            <Store className="brand-store-icon" />
          </div>
          <div>
            <p className="brand-eyebrow">POS Kasir Modern</p>
            <h1>WarungQ New</h1>
          </div>
        </div>

        <div className="cart-badge" aria-label="Jumlah item di keranjang">
          <ShoppingCart className="cart-badge-icon" />
          <div>
            <span className="cart-badge-count">{cartCount}</span>
            <span className="cart-badge-label">Item dipilih</span>
          </div>
        </div>

        <button className="logout-button" type="button" onClick={handleLogout}>
          Logout
        </button>
      </header>

      <main className="page-wrap">
        <section className="hero-card">
          <div className="hero-copy">
            <span className="hero-pill">Buka 08.00 - 22.00</span>
            <h2>Pesan cepat, lihat total langsung, dan bayar tanpa ribet.</h2>
          </div>

          <div className="hero-metrics">
            <div>
              <strong>{allItems.length}</strong>
              <span>Menu tersedia</span>
            </div>
            <div>
              <strong>{cart.length}</strong>
              <span>Jenis di keranjang</span>
            </div>
            <div>
              <strong>{formatRupiah(total)}</strong>
              <span>Total saat ini</span>
            </div>
          </div>
        </section>

        <section className="category-strip" aria-label="Filter kategori">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`category-chip ${activeCategory === cat.id ? 'active' : ''}`}
            >
              <span>{cat.emoji}</span>
              {cat.label}
            </button>
          ))}
        </section>

        <section className="content-grid">
          <div className="menu-panel">
            <div className="section-heading">
              <div>
                <p>Menu pilihan</p>
                <h3>{activeCategory === 'all' ? 'Semua kategori' : categories.find(cat => cat.id === activeCategory)?.label}</h3>
              </div>
              <span>{filteredItems.length} item</span>
            </div>

            <div className="menu-grid">
              {filteredItems.map((item) => (
                <article key={item.id} className="menu-card">
                  <div className="menu-card-emoji">{item.icon}</div>
                  <div className="menu-card-body">
                    <h4>{item.name}</h4>
                    <p>{formatRupiah(item.price)}</p>
                  </div>
                  <button onClick={() => addToCart(item)} className="menu-add-button">
                    <Plus size={18} />
                    Pesan
                  </button>
                </article>
              ))}
            </div>
          </div>

          <aside className="cart-panel">
            <div className="section-heading">
              <div>
                <p>Keranjang</p>
                <h3>Pesanan Anda</h3>
              </div>
              <span>{cartCount} item</span>
            </div>

            {cart.length > 0 ? (
              <>
                <div className="cart-list">
                  {cart.map((item) => (
                    <div key={item.id} className="cart-item">
                      <div className="cart-item-left">
                        <span className="cart-item-emoji">{item.icon}</span>
                        <div>
                          <h4>{item.name}</h4>
                          <p>{formatRupiah(item.price)}</p>
                        </div>
                      </div>

                      <div className="cart-item-actions">
                        <button onClick={() => removeFromCart(item.id)} aria-label={`Kurangi ${item.name}`}>
                          <Minus size={16} />
                        </button>
                        <span>{item.quantity}</span>
                        <button onClick={() => addToCart(item)} aria-label={`Tambah ${item.name}`}>
                          <Plus size={16} />
                        </button>
                        <button onClick={() => deleteItem(item.id)} className="danger" aria-label={`Hapus ${item.name}`}>
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="checkout-box">
                  <div className="payment-methods">
                    <p className="payment-method-label">Metode pembayaran</p>
                    <div className="payment-options">
                      <button
                        type="button"
                        className={paymentMethod === 'cash' ? 'payment-option active' : 'payment-option'}
                        onClick={() => setPaymentMethod('cash')}
                      >
                        <span className="payment-option-icon">💵</span>
                        <div>
                          <strong>Cash</strong>
                          <span>Bayar dikasir</span>
                        </div>
                      </button>

                      <button
                        type="button"
                        className={paymentMethod === 'qris' ? 'payment-option active' : 'payment-option'}
                        onClick={() => setPaymentMethod('qris')}
                      >
                        <span className="payment-option-icon">📱</span>
                        <div>
                          <strong>QRIS</strong>
                          <span>Scan untuk bayar</span>
                        </div>
                      </button>
                    </div>
                  </div>

                  {paymentMethod === 'qris' && (
                    <div className="qris-card">
                      <div className="qris-card-header">
                        <div>
                          <p className="qris-label">QRIS Pembayaran</p>
                          <strong>Scan untuk bayar digital</strong>
                        </div>
                        <span className="qris-status">Aktif</span>
                      </div>

                      <div className="qris-pattern" aria-hidden="true">
                        {qrisModules.map((row, rowIndex) =>
                          row.map((cell, cellIndex) => (
                            <span
                              key={`${rowIndex}-${cellIndex}`}
                              className={cell === 1 ? 'filled' : 'empty'}
                            />
                          ))
                        )}
                      </div>

                      <div className="qris-copy">
                        <strong>WarungQ New</strong>
                        <p>Gunakan e-wallet atau mobile banking untuk memindai QRIS di atas.</p>
                        <div className="qris-meta">
                          <span>Nominal</span>
                          <strong>{formatRupiah(total)}</strong>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="total-row">
                    <span>Total bayar</span>
                    <strong>{formatRupiah(total)}</strong>
                  </div>
                  <button className="checkout-button" onClick={handleCheckout}>
                    {paymentMethod === 'cash' ? 'Bayar di Kasir' : 'Bayar QRIS'}
                  </button>

                  {paymentMessage && (
                    <div className="payment-message">
                      {paymentMessage}
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="empty-cart">
                <div className="empty-cart-icon">🛒</div>
                <h4>Keranjang masih kosong</h4>
                <p>Pilih menu di sebelah kiri untuk mulai menambahkan pesanan.</p>
              </div>
            )}
          </aside>
        </section>

        <section className="report-panel">
          <div className="section-heading">
            <div>
              <p>Laporan transaksi</p>
              <h3>Riwayat pembelian</h3>
            </div>
            <span>{purchaseHistory.length} transaksi</span>
          </div>

          <div className="report-summary">
            <div>
              <strong>{historySummary.transactionCount}</strong>
              <span>Transaksi selesai</span>
            </div>
            <div>
              <strong>{formatRupiah(historySummary.totalSpent)}</strong>
              <span>Total pembelian</span>
            </div>
            <div>
              <strong>{historySummary.cashCount + historySummary.qrisCount}</strong>
              <span>Metode pembayaran</span>
            </div>
          </div>

          <div className="history-grid">
            <div className="history-block">
              <p className="history-block-label">Cash / bayar dikasir</p>
              <strong>{historySummary.cashCount} transaksi</strong>
            </div>
            <div className="history-block">
              <p className="history-block-label">QRIS</p>
              <strong>{historySummary.qrisCount} transaksi</strong>
            </div>
          </div>

          {purchaseHistory.length > 0 ? (
            <div className="history-list">
              {purchaseHistory.map((order) => (
                <article key={order.id} className="history-card">
                  <div className="history-card-top">
                    <div>
                      <p className="history-card-code">{order.id}</p>
                      <h4>{formatDateTime(order.timestamp)}</h4>
                    </div>
                    <span className={`history-payment ${order.paymentMethod}`}>
                      {order.paymentMethod === 'cash' ? 'Cash' : 'QRIS'}
                    </span>
                  </div>

                  <div className="history-card-meta">
                    <span>{order.itemCount} item</span>
                    <span>{formatRupiah(order.total)}</span>
                    <span>{order.status}</span>
                  </div>

                  <div className="history-items">
                    {order.items.map((item) => (
                      <div key={`${order.id}-${item.id}`} className="history-item">
                        <span>{item.icon}</span>
                        <div>
                          <strong>{item.name}</strong>
                          <p>
                            {item.quantity} x {formatRupiah(item.price)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="history-empty">
              <h4>Belum ada riwayat pembelian</h4>
              <p>Setelah checkout selesai, laporan transaksi akan muncul di sini.</p>
            </div>
          )}
        </section>
      </main>

      <footer className="footer-bar">
        <p>🏪 WarungQ New - Warung Kekinian</p>
        <span>© 2026 Made with love for WarungQ</span>
      </footer>
    </div>
  );
}

export default App;