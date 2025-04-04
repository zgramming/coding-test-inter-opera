from pydantic import BaseModel
from typing import List

class Client(BaseModel):
    name: str
    industry: str
    contact: str

class Deal(BaseModel):
    client: str
    value: int
    status: str

class SalesRepData(BaseModel):
    id: int
    name: str
    role: str
    region: str
    skills: List[str]
    deals: List[Deal]
    clients: List[Client]

class SalesRepModel(BaseModel):
    salesReps: List[SalesRepData]