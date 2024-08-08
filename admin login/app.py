from flask import Flask, render_template, request, redirect, url_for, flash, session
from pymongo import MongoClient
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your_secret_key'

# MongoDB setup
client = MongoClient('mongodb://localhost:27017/')
db = client['admin_db']
admins_collection = db['admins']

# Ensure the collection has an admin user
if admins_collection.count_documents({}) == 0:
    admins_collection.insert_one({
        'username': 'admin',
        'password': generate_password_hash('admin', method='pbkdf2:sha256')
    })

@app.route('/admin/login', methods=['GET', 'POST'])
def admin_login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']

        admin = admins_collection.find_one({'username': username})

        if admin and check_password_hash(admin['password'], password):
            session['admin_logged_in'] = True
            flash('Login successful!', 'success')
            return redirect(url_for('admin_dashboard'))
        else:
            flash('Invalid username or password', 'danger')

    return render_template('admin_login.html')

@app.route('/db/add', methods=['GET', 'POST'])
def add_mobile_data():
    if not session.get('admin_logged_in'):
        return redirect(url_for('admin_login'))

    if request.method == 'POST':
        # Get form data
        brand = request.form['brand']
        model = request.form['model']
        price = request.form['price']

        # Insert data into the database
        db['mobile_data'].insert_one({
            'brand': brand,
            'model': model,
            'price': price
        })

        flash('Mobile data added successfully!', 'success')
        return redirect(url_for('admin_dashboard'))

    return render_template('add_data.html')


@app.route('/admin/dashboard')
def admin_dashboard():
    if not session.get('admin_logged_in'):
        return redirect(url_for('admin_login'))
    return render_template('admin_dashboard.html')

@app.route('/admin/logout')
def admin_logout():
    session.pop('admin_logged_in', None)
    flash('You have been logged out.', 'info')
    return redirect(url_for('admin_login'))

if __name__ == '__main__':
    app.run(debug=True)
