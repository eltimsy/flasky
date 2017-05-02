from marshmallow import Schema, fields


class EntriesSchema(Schema):
    id = fields.Int()
    title = fields.Str()
    text = fields.Str()
