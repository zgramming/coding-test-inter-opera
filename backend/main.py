import uvicorn
import json

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from services.genai_service import GenAIService
from dotenv import load_dotenv

from models.sales_reps_model import SalesRepModel;
from models.ai_response_model import AIResponseModel
from models.user_question_dto import UserQuestionDto

load_dotenv()

COLORS = [
    "red",
    "blue",
    "green",
    "yellow",
    "purple",
    "orange",
    "pink",
    "brown",
    "gray",
    "cyan",
    "magenta",
    "lime",
    "teal",
    "navy",
    "maroon",
    "olive",
    "silver",
]

app = FastAPI()

# Load dummy data
with open("dummyData.json", "r") as f:
    DUMMY_DATA = SalesRepModel.model_validate(json.load(f)).salesReps
    DUMMY_DATA_JSON = json.dumps(DUMMY_DATA, default=lambda o: o.dict(), indent=4)

# CORS middleware to allow requests from the frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace with your frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/sales")
def get_data(
    search: str|None = None,
    region: str|None = None,
    page: int = 1,
    limit: int = 10,
    ):
    items = DUMMY_DATA
    
    # Filter data based on search and region if provided
    if search:
        items = [
            item for item in items 
            # Search if search is in the name or role of the sales rep
            if search.lower() in item.name.lower() or search.lower() in item.role.lower()
        ]
    if region:
        items = [item for item in items if region.lower() in item.region.lower()]
        
    # Pagination logic
    total_items = len(items)
    start_index = (page - 1) * limit
    end_index = start_index + limit
    items = items[start_index:end_index]

    return {
        "data": items,
        "page": page,
        "limit": limit,
        "total_items": total_items,
    }

@app.get("/api/sales/dashboard/sales-overview")
def get_sales_overview():
    
    # Return list of sales reps with their respective sales data
    result: list = []
    for item in DUMMY_DATA:
        totalDealsAmount = sum(deal.value for deal in item.deals)
        
        result.append({
            "name": item.name,
            "value": totalDealsAmount,
        })
    
    # Sort the result by deal value in descending order
    result.sort(key=lambda x: x["value"], reverse=True)

    return {
        "data": result,
    }

@app.get("/api/sales/dashboard/region-overview")
def get_region_overview():
    dict = {}
    for item in DUMMY_DATA:
        region = item.region
        totalDealsAmount = sum(deal.value for deal in item.deals)
        
        if region not in dict:
            dict[region] = {
                "name": region,
                "value": 0,
            }
        
        dict[region]["value"] += totalDealsAmount
    
    # Convert dict to list
    result = list(dict.values())
    
    # Sort the result by total value in descending order
    result.sort(key=lambda x: x["value"], reverse=True)
    
    return {
        "data": result,
    }

@app.get("/api/sales/dashboard/industry-overview")
def get_industry_overview():
    dict = {}
    for item in DUMMY_DATA:
        for client in item.clients:
            industry = client.industry
            totalDealsAmount = sum(deal.value for deal in item.deals if deal.client == client.name)
            
            if industry not in dict:
                dict[industry] = {
                    "name": industry,
                    "value": 0,
                    "color": COLORS[len(dict) % len(COLORS)],
                }
            
            dict[industry]["value"] += totalDealsAmount
    
    # Convert dict to list
    result = list(dict.values())
    
    # Sort the result by total value in descending order
    result.sort(key=lambda x: x["value"], reverse=True)

    return {
        "data": result,
    }


@app.post("/api/sales/ask-ai", response_model=AIResponseModel)
async def ai_endpoint(body: UserQuestionDto):
    
    result = GenAIService().start_chat(input_text=body.question, scope_data=DUMMY_DATA_JSON)
    return {
        "answer": result,
    }

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
