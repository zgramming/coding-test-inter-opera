from pydantic import BaseModel


class AIResponseModel(BaseModel):
    answer: str