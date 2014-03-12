#coding=utf-8
import logging
import os

from sensors import DHT, BMP, Light
from db import Session
from model import Data


SENSOR = [DHT(7), BMP(), Light(3)]
MAIN_DIC = os.path.split(os.path.realpath(__file__))[0]


def fetch():
    def aggregate(x, y):
        x.update(y)
        return x

    rv = map(lambda x: x.read(), SENSOR)
    rv = reduce(aggregate, rv, {})
    return rv


def store(data):
    session = Session()
    if Data.compare_last(session, data):
        item = Data(**data)
        session.add(item)
        session.commit()
        logging.info('Stored!')
    else:
        logging.debug('No Changes')


if __name__ == '__main__':
    LOG_PATH = os.path.join(MAIN_DIC, 'log/fetch.log')
    logging.basicConfig(filename=LOG_PATH, filemode='a', level=logging.INFO,
                        format='%(asctime)s - %(levelname)s: %(message)s')
    store(fetch())
