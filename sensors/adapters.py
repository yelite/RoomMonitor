#coding=utf-8
__author__ = 'Yelite'

import os
from subprocess import Popen, PIPE
import time

EXEC_DIR = os.path.split(os.path.realpath(__file__))[0]


class Sensor:
    cmd = ''
    retry_limit = 5

    def __init__(self, *args):
        args = map(str, args)
        self.args = args

    def _fetch(self):
        cmd = [os.path.join(EXEC_DIR, self.cmd)]
        cmd.extend(self.args)
        output = Popen(cmd, stdout=PIPE)
        rv = output.stdout.read()
        return rv

    def _parse(self, data):
        raise Exception("_parse not implemented!")

    def read(self):
        retry = 0
        while retry < self.retry_limit:
            output = self._fetch()
            data = self._parse(output)
            if data:
                return data
            else:
                retry += 1
                time.sleep(0.5)
        return 'error'


class BMP(Sensor):
    cmd = 'BMP/bmp'

    def _parse(self, data):
        try:
            p = int(data.splitlines()[-1])
            t = float(data.splitlines()[-3])
        except IndexError:
            return None
        else:
            return {'pressure': p,
                    'temp': t}


class DHT(Sensor):
    cmd = 'DHT/dht'

    def _parse(self, data):
        p = data.splitlines()[-1]
        try:
            rv = int(p)
        except IndexError:
            return None
        else:
            return {'hum': rv}


class Light(Sensor):
    cmd = 'LightSensor/light'

    def _parse(self, data):
        p = data.splitlines()[-1]
        try:
            rv = int(p)
        except IndexError:
            return None
        else:
            return {'light': rv}
