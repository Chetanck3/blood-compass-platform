
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Users, MapPin, Award, Calendar, TrendingUp, Clock, Download } from "lucide-react";
import { BloodTypeSelector } from "../shared/BloodTypeSelector";
import { useState } from "react";

export const DonorDashboard = () => {
  const [bloodType, setBloodType] = useState('O+');

  const donations = [
    { id: 1, date: '2024-01-15', location: 'City General Hospital', status: 'Completed' },
    { id: 2, date: '2024-01-02', location: 'Red Cross Center', status: 'Completed' },
    { id: 3, date: '2023-12-20', location: 'Community Blood Bank', status: 'Completed' },
  ];

  const matches = [
    { id: 1, patient: 'Emergency Case #1234', hospital: 'City General Hospital', urgency: 'Critical', bloodType: 'O+' },
    { id: 2, patient: 'Surgery Patient', hospital: 'Metro Medical Center', urgency: 'High', bloodType: 'O+' },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Overview */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="border-red-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Donations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-500">15</div>
            <p className="text-sm text-gray-500 mt-1">Since joining</p>
          </CardContent>
        </Card>

        <Card className="border-blue-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Lives Saved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-500">45</div>
            <p className="text-sm text-gray-500 mt-1">People helped</p>
          </CardContent>
        </Card>

        <Card className="border-green-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Donor Level</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-500">Gold</div>
            <p className="text-sm text-gray-500 mt-1">Hero status</p>
          </CardContent>
        </Card>

        <Card className="border-purple-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Next Eligible</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-500">12</div>
            <p className="text-sm text-gray-500 mt-1">Days remaining</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Blood Type & Profile */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-red-500" />
              Donor Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-600">Blood Type</label>
              <BloodTypeSelector value={bloodType} onChange={setBloodType} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Weight</label>
                <p className="text-lg font-semibold">70 kg</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Age</label>
                <p className="text-lg font-semibold">28 years</p>
              </div>
            </div>
            <Button className="w-full bg-red-500 hover:bg-red-600">
              <Calendar className="mr-2 h-4 w-4" />
              Schedule Donation
            </Button>
          </CardContent>
        </Card>

        {/* Current Matches */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-500" />
              Current Matches
            </CardTitle>
            <CardDescription>
              Patients who need your blood type
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {matches.map((match) => (
                <div key={match.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">{match.patient}</h4>
                    <Badge variant={match.urgency === 'Critical' ? 'destructive' : 'secondary'}>
                      {match.urgency}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{match.hospital}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Blood Type: {match.bloodType}</span>
                    <Button size="sm" variant="outline">
                      Respond
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Donations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-500" />
            Donation History
          </CardTitle>
          <CardDescription>
            Your recent blood donations and their impact
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {donations.map((donation) => (
              <div key={donation.id} className="flex items-center justify-between border-b pb-4">
                <div>
                  <p className="font-semibold">{donation.location}</p>
                  <p className="text-sm text-gray-600">{donation.date}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{donation.status}</Badge>
                  <Button size="sm" variant="ghost">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-yellow-500" />
            Achievements & Rewards
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <Award className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
              <h4 className="font-semibold">Hero Badge</h4>
              <p className="text-sm text-gray-600">10+ donations</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <Heart className="h-8 w-8 text-red-500 mx-auto mb-2" />
              <h4 className="font-semibold">Life Saver</h4>
              <p className="text-sm text-gray-600">Saved 45 lives</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <Clock className="h-8 w-8 text-blue-500 mx-auto mb-2" />
              <h4 className="font-semibold">Regular Donor</h4>
              <p className="text-sm text-gray-600">1 year streak</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
