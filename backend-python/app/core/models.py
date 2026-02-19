from pydantic import BaseModel


class Bin(BaseModel):
    id: int
    name: str
    location: str
    latitude: float
    longitude: float
    fill_level: int  # percentage 0-100

