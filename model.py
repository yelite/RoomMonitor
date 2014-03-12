#coding=utf-8

from datetime import datetime
import logging

from sqlalchemy import Column, Integer, Float, DateTime
from sqlalchemy.ext.declarative import declarative_base


Base = declarative_base()


class Data(Base):
    __tablename__ = 'data'

    id = Column(Integer, primary_key=True)
    time = Column(DateTime, index=True, default=datetime.now)
    temp = Column(Float)
    pressure = Column(Float)
    light = Column(Integer)
    hum = Column(Integer)

    __mapper_args__ = {'order_by': id.desc()}

    @property
    def timestamp(self):
        return int(self.time.strftime('%s')) * 1000

    @property
    def light_level(self):
        return 4095 - self.light

    @classmethod
    def get_last(cls, session):
        return session.query(cls).first()

    @classmethod
    def compare_last(cls, session, data):
        last = cls.get_last(session)
        if not last:
            return True
        if abs(last.temp - data['temp']) > 0.12:
            logging.debug('{} -> {}'.format(last.temp, data['temp']))
            return True
        if abs(last.hum - data['hum']) > 1.5:
            logging.debug('{} -> {}'.format(last.hum, data['hum']))
            return True
        if abs(last.pressure - data['pressure']) > 24:
            logging.debug('{} -> {}'.format(last.pressure, data['pressure']))
            return True
        if abs(last.light - data['light']) > 250:
            logging.debug('{} -> {}'.format(last.light, data['light']))
            return True
        return False





