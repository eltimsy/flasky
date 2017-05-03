from marshmallow import Schema, fields


class EntriesSchema(Schema):
    id = fields.Int(dump_only=True)
    title = fields.Str()
    text = fields.Str()
