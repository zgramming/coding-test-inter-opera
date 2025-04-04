from pydantic import BaseModel

class UserQuestionDto(BaseModel):
    question: str
