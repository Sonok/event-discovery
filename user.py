from dataclasses import dataclass, asdict

@dataclass
class User:
    user_id: str
    name: str
    email: str
    interests: list[str]

    def to_dict(self):
        return asdict(self)
