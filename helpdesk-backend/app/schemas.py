from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from enum import Enum


class TicketCategoryEnum(str, Enum):
    IT = "IT"
    ADMINISTRATION = "ADMINISTRATION"
    TRANSPORT = "TRANSPORT"


class TicketStatusEnum(str, Enum):
    OPEN = "OPEN"
    IN_PROGRESS = "IN_PROGRESS"
    CLOSED = "CLOSED"


class TicketPriorityEnum(str, Enum):
    LOW = "LOW"
    MEDIUM = "MEDIUM"
    HIGH = "HIGH"
    CRITICAL = "CRITICAL"


class TicketBase(BaseModel):
    title: str
    description: str
    category: TicketCategoryEnum
    requester_email: Optional[str] = None
    priority: TicketPriorityEnum = TicketPriorityEnum.MEDIUM  # default


class TicketCreate(TicketBase):
    pass


class TicketUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    category: Optional[TicketCategoryEnum] = None
    status: Optional[TicketStatusEnum] = None
    requester_email: Optional[str] = None
    assigned_engineer: Optional[str] = None
    priority: Optional[TicketPriorityEnum] = None


class TicketRead(TicketBase):
    id: int
    status: TicketStatusEnum
    assigned_engineer: Optional[str] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True
