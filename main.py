#coding=utf-8

from datetime import datetime, timedelta

from flask import Flask, render_template, g, jsonify

from model import Data
from helper import gen_unpack_func
from fetch import fetch


app = Flask(__name__)


def get_session():
    session = getattr(g, '_session', None)
    if session is None:
        from db import Session

        session = g._session = Session()
    return session


@app.teardown_appcontext
def close_session(exception):
    session = getattr(g, '_session', None)
    if session:
        # noinspection PyUnresolvedReferences
        session.close()


@app.route('/')
def new():
    return render_template('stat.html')


@app.route('/data')
def data():
    session = get_session()
    t = datetime.now() - timedelta(weeks=2)
    obj = session.query(Data).filter(Data.time > t).order_by(Data.time).all()
    # noinspection PyShadowingNames
    data = {
        'timestamp': [],
        'pressure': [],
        'light_level': [],
        'temp': [],
        'hum': []
    }
    map(gen_unpack_func(data, ['timestamp', 'pressure', 'light_level', 'temp', 'hum']), obj)
    return jsonify(**data)


@app.route('/current')
def current():
    rv = fetch()
    data = {'Light': 4095 - int(rv['light']),
            'Temp': str(rv['temp']) + ' C',
            'Pressure': str(rv['pressure'] / 100) + ' hPa',
            'Humidity': str(rv['hum']) + '%'}
    return render_template('current.html', items=data.items())


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8089, debug=1)