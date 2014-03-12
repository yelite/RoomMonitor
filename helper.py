#coding=utf-8


def gen_unpack_func(data, keys):
    def helper(obj):
        for key in keys:
            data.get(key).append(getattr(obj, key, None))

    return helper