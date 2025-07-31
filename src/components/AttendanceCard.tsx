import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Users, Calendar } from "lucide-react";

interface Person {
  id: number;
  name: string;
  status: "present" | "absent" | "unmarked";
}

const AttendanceCard = () => {
  const [attendees, setAttendees] = useState<Person[]>([
    { id: 1, name: "Alex Johnson", status: "unmarked" },
    { id: 2, name: "Sarah Wilson", status: "unmarked" },
    { id: 3, name: "Michael Chen", status: "unmarked" },
    { id: 4, name: "Emily Davis", status: "unmarked" },
    { id: 5, name: "David Rodriguez", status: "unmarked" },
    { id: 6, name: "Jessica Kim", status: "unmarked" },
    { id: 7, name: "James Thompson", status: "unmarked" },
    { id: 8, name: "Ashley Martinez", status: "unmarked" },
  ]);

  const markAttendance = (id: number, status: "present" | "absent") => {
    setAttendees(prev => 
      prev.map(person => 
        person.id === id ? { ...person, status } : person
      )
    );
  };

  const presentCount = attendees.filter(p => p.status === "present").length;
  const absentCount = attendees.filter(p => p.status === "absent").length;
  const totalCount = attendees.length;

  const getStatusBadge = (status: Person["status"]) => {
    switch (status) {
      case "present":
        return <Badge variant="secondary" className="bg-success text-success-foreground">Present</Badge>;
      case "absent":
        return <Badge variant="destructive">Absent</Badge>;
      default:
        return <Badge variant="outline">Unmarked</Badge>;
    }
  };

  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Attendance Dashboard</h1>
        <div className="flex items-center justify-center gap-2 text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>{currentDate}</span>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-card shadow-soft">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Users className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-muted-foreground">Total</span>
            </div>
            <div className="text-2xl font-bold text-foreground">{totalCount}</div>
          </CardContent>
        </Card>
        
        <Card className="bg-card shadow-soft">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <CheckCircle className="h-5 w-5 text-success" />
              <span className="text-sm font-medium text-muted-foreground">Present</span>
            </div>
            <div className="text-2xl font-bold text-success">{presentCount}</div>
          </CardContent>
        </Card>
        
        <Card className="bg-card shadow-soft">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <XCircle className="h-5 w-5 text-destructive" />
              <span className="text-sm font-medium text-muted-foreground">Absent</span>
            </div>
            <div className="text-2xl font-bold text-destructive">{absentCount}</div>
          </CardContent>
        </Card>
      </div>

      {/* Attendance List */}
      <Card className="bg-card shadow-soft">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-foreground">Mark Attendance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {attendees.map((person) => (
            <div
              key={person.id}
              className="flex items-center justify-between p-4 border border-border rounded-lg bg-card hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-sm font-medium text-primary">
                    {person.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h3 className="font-medium text-foreground">{person.name}</h3>
                  {getStatusBadge(person.status)}
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant={person.status === "present" ? "secondary" : "outline"}
                  size="sm"
                  onClick={() => markAttendance(person.id, "present")}
                  className={person.status === "present" ? "bg-success text-success-foreground hover:bg-success/90" : ""}
                >
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Present
                </Button>
                <Button
                  variant={person.status === "absent" ? "destructive" : "outline"}
                  size="sm"
                  onClick={() => markAttendance(person.id, "absent")}
                >
                  <XCircle className="h-4 w-4 mr-1" />
                  Absent
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default AttendanceCard;