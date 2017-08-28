from __future__ import print_function
import sys
import os
import sqlite3
import requests
from flask import Flask, request, session, g, redirect, url_for, abort, \
     render_template, flash, json
from .secrets import (
    USER,
    PASS,
    GOOGLE_MAPS_KEY,
    GOOGLE_PLACES_KEY,
    BREWERYDB_KEY,
)

app = Flask(__name__) # create the application instance :)
app.config['SERVER_NAME'] = 'flasky:5000'
app.config.from_object(__name__) # load config from this file , flaskr.py
# Load default config and override config from an environment variable
app.config.update(dict(
    DATABASE=os.path.join(app.root_path, 'flasky.db'),
    SECRET_KEY='development key',
    USERNAME=USER,
    PASSWORD=PASS,
))
app.config.from_envvar('FLASKY_SETTINGS', silent=True)


def connect_db():
    """Connects to the specific database."""
    rv = sqlite3.connect(app.config['DATABASE'])
    rv.row_factory = sqlite3.Row
    return rv


def init_db():
    db = get_db()
    with app.open_resource('schema.sql', mode='r') as f:
        db.cursor().executescript(f.read())
    db.commit()

@app.cli.command('initdb')
def initdb_command():
    """Initializes the database."""
    init_db()
    print('Initialized the database.')


def get_db():
    """Opens a new database connection if there is none yet for the
    current application context.
    """
    if not hasattr(g, 'sqlite_db'):
        g.sqlite_db = connect_db()
    return g.sqlite_db

@app.teardown_appcontext
def close_db(error):
    """Closes the database again at the end of the request."""
    if hasattr(g, 'sqlite_db'):
        g.sqlite_db.close()

@app.route('/')
def home():
    return render_template('layout.html', googlekey=GOOGLE_MAPS_KEY)


@app.route('/map', methods=['GET'])
def map():
    address = request.values['address']
    address.replace(" ", "+")
    city = request.values['city']
    country = request.values['country']
    geoaddress = address + ',' + city + ',' + country
    geolocation = requests.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + geoaddress + '&key=' + GOOGLE_MAPS_KEY)
    lat = geolocation.json()['results'][0]['geometry']['location']['lat']
    lng = geolocation.json()['results'][0]['geometry']['location']['lng']
    markers = 'markers=' + str(lat) + ',' + str(lng)
    zoom = '&zoom=' + request.values['zoom']
    url = 'https://maps.googleapis.com/maps/api/staticmap?center=' + geoaddress + zoom + '&size=600x400&maptype=roadmap&' +  markers + '&key=' + GOOGLE_MAPS_KEY
    result = json.dumps({'map': url})
    return result

@app.route('/places', methods=['GET'])
def getplaces():
    payload = {'key': GOOGLE_PLACES_KEY, 'location': '43.6476865,-79.3933145', 'radius': '5000', 'type': 'doctor'}
    places = requests.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json', params=payload)
    data = places.json()
    result = json.dumps({'info': data})
    return result

@app.route('/beer', methods=['GET'])
def beer():
    payload = {'key': BREWERYDB_KEY, 'name': request.values['beer']}
    r = requests.get('http://api.brewerydb.com/v2/beers', params=payload)
    result = r.text
    return result

@app.route('/addbeer', methods=['POST'])
def add_beer():
    db = get_db()
    db.execute('insert into beer (name, url, description) values (?, ?, ?)',
                 [request.form['name'], request.form['url'], request.form['description']])
    db.commit()
    flash('Beer was inserted into db')
    return redirect(url_for('show_entries'))

@app.route('/showentries', methods=['GET'])
def show_entries():
    db = get_db()
    cur = db.execute('select title, text from entries order by id desc')
    beer = db.execute('select * from beer order by id asc')
    entries = cur.fetchall()
    beers = beer.fetchall()
    result = json.dumps([[toJSON(item) for item in entries], [toBEER(item) for item in beers]])
    return result
    # return render_template('show_entries.html', entries=entries)


def toJSON(item):
    return {'title': item['title'], 'text': item['text']}

def toBEER(item):
    return {'id': item['id'], 'name': item['name'], 'url': item['url'], 'description': item['description']}

@app.route('/vuefun')
def vue_page():
    return render_template('vue_fun.html')

@app.route('/add', methods=['POST'])
def add_entry():
    # if not session.get('logged_in'):
    #     abort(401)
    db = get_db()
    db.execute('insert into entries (title, text) values (?, ?)',
                 [request.form['title'], request.form['text']])
    db.commit()
    flash('New entry was successfully posted')
    return redirect(url_for('show_entries'))

@app.route('/delete', methods=['DELETE'])
def delete_entry():
    db = get_db()
    db.execute('delete from entries where text=(?)', [request.form['entry']])
    db.commit()
    flash('Entry was deleted')
    return ('success')

@app.route('/edit', methods=['PUT'])
def edit_entry():
    db = get_db()
    db.execute('update entries set text=(?) where text=(?)', [request.form['change'], request.form['entry']])
    db.commit()
    flash('Entry was updated')
    return ('success')

@app.route('/login', methods=['GET', 'POST'])
def login():
    error = None
    if request.method == 'POST':
        if request.form['username'] != app.config['USERNAME']:
            error = 'Invalid username'
        elif request.form['password'] != app.config['PASSWORD']:
            error = 'Invalid password'
        else:
            session['logged_in'] = True
            flash('You were logged in')
            return redirect(url_for('show_entries'))
    return render_template('login.html', error=error)

@app.route('/logout')
def logout():
    session.pop('logged_in', None)
    flash('You were logged out')
    return redirect(url_for('show_entries'))