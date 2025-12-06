import enum
from sqlalchemy import Column, Integer, String, Text, Enum, DateTime
from sqlalchemy.sql import func
from app.database import Base


class TicketCategory(str, enum.Enum):
    IT = "IT"
    ADMINISTRATION = "ADMINISTRATION"
    TRANSPORT = "TRANSPORT"


class TicketStatus(str, enum.Enum):
    OPEN = "OPEN"
    IN_PROGRESS = "IN_PROGRESS"
    CLOSED = "CLOSED"


class TicketPriority(str, enum.Enum):
    LOW = "LOW"
    MEDIUM = "MEDIUM"
    HIGH = "HIGH"
    CRITICAL = "CRITICAL"


class Ticket(Base):
    __tablename__ = "tickets"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), nullable=False)
    description = Column(Text, nullable=False)
    category = Column(Enum(TicketCategory), nullable=False)
    status = Column(
        Enum(TicketStatus),
        default=TicketStatus.OPEN,
        nullable=False
    )
    priority = Column(
        Enum(TicketPriority),
        default=TicketPriority.MEDIUM,
        nullable=False
    )

    requester_email = Column(String(255), nullable=True)
    assigned_engineer = Column(String(255), nullable=True)

    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now()
    )
