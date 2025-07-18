import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, Trash2, Save, MessageSquare, Phone, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

interface Contact {
  id: string;
  name: string;
  phone: string;
}

const Settings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Settings state
  const [sosMessage, setSosMessage] = useState(
    "Emergency! I've been in an accident and need help. My current location is: [location]"
  );
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [sendSMS, setSendSMS] = useState(true);
  const [sendWhatsApp, setSendWhatsApp] = useState(true);
  
  // Form state
  const [newContactName, setNewContactName] = useState("");
  const [newContactPhone, setNewContactPhone] = useState("");

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedMessage = localStorage.getItem("bikerSOS_message");
    const savedContacts = localStorage.getItem("bikerSOS_contacts");
    const savedSMS = localStorage.getItem("bikerSOS_sendSMS");
    const savedWhatsApp = localStorage.getItem("bikerSOS_sendWhatsApp");

    if (savedMessage) setSosMessage(savedMessage);
    if (savedContacts) setContacts(JSON.parse(savedContacts));
    if (savedSMS) setSendSMS(JSON.parse(savedSMS));
    if (savedWhatsApp) setSendWhatsApp(JSON.parse(savedWhatsApp));
  }, []);

  const addContact = () => {
    if (!newContactName.trim() || !newContactPhone.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter both name and phone number.",
        variant: "destructive",
      });
      return;
    }

    const newContact: Contact = {
      id: Date.now().toString(),
      name: newContactName.trim(),
      phone: newContactPhone.trim(),
    };

    setContacts([...contacts, newContact]);
    setNewContactName("");
    setNewContactPhone("");
    
    toast({
      title: "Contact Added",
      description: `${newContact.name} has been added to your emergency contacts.`,
    });
  };

  const removeContact = (contactId: string) => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
    toast({
      title: "Contact Removed",
      description: "Emergency contact has been removed.",
    });
  };

  const saveSettings = () => {
    // Save to localStorage
    localStorage.setItem("bikerSOS_message", sosMessage);
    localStorage.setItem("bikerSOS_contacts", JSON.stringify(contacts));
    localStorage.setItem("bikerSOS_sendSMS", JSON.stringify(sendSMS));
    localStorage.setItem("bikerSOS_sendWhatsApp", JSON.stringify(sendWhatsApp));

    toast({
      title: "✅ Settings Saved",
      description: "Your emergency settings have been saved successfully.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="p-4 border-b border-border">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate("/")}
            className="p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
            aria-label="Back to Dashboard"
          >
            <ArrowLeft className="h-5 w-5 text-secondary-foreground" />
          </button>
          <h1 className="text-xl font-bold text-foreground">Emergency Settings</h1>
        </div>
      </header>

      <div className="p-4 space-y-6 max-w-2xl mx-auto">
        {/* SOS Message Template */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MessageSquare className="h-5 w-5" />
              <span>SOS Message Template</span>
            </CardTitle>
            <CardDescription>
              Customize your emergency message. Use [location] as placeholder for GPS coordinates.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Label htmlFor="message">Emergency Message</Label>
              <Textarea
                id="message"
                value={sosMessage}
                onChange={(e) => setSosMessage(e.target.value)}
                placeholder="Enter your emergency message..."
                className="min-h-[100px] resize-none"
              />
              <p className="text-xs text-muted-foreground">
                The [location] placeholder will be replaced with a clickable map link.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Emergency Contacts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span>Emergency Contacts</span>
            </CardTitle>
            <CardDescription>
              Add trusted contacts who will receive your SOS alerts.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Add New Contact */}
            <div className="space-y-3 p-4 bg-secondary/50 rounded-lg">
              <h4 className="font-medium text-sm">Add New Contact</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="contactName">Name</Label>
                  <Input
                    id="contactName"
                    value={newContactName}
                    onChange={(e) => setNewContactName(e.target.value)}
                    placeholder="Contact name"
                  />
                </div>
                <div>
                  <Label htmlFor="contactPhone">Phone Number</Label>
                  <Input
                    id="contactPhone"
                    value={newContactPhone}
                    onChange={(e) => setNewContactPhone(e.target.value)}
                    placeholder="+1234567890"
                    type="tel"
                  />
                </div>
              </div>
              <Button onClick={addContact} className="w-full" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Contact
              </Button>
            </div>

            {/* Contact List */}
            <div className="space-y-2">
              {contacts.length > 0 ? (
                contacts.map((contact) => (
                  <div
                    key={contact.id}
                    className="flex items-center justify-between p-3 bg-card rounded-lg border"
                  >
                    <div>
                      <p className="font-medium text-card-foreground">{contact.name}</p>
                      <p className="text-sm text-muted-foreground">{contact.phone}</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeContact(contact.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  No emergency contacts added yet.
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Sending Methods */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Phone className="h-5 w-5" />
              <span>Sending Methods</span>
            </CardTitle>
            <CardDescription>
              Choose how to send your emergency alerts.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Send via SMS</Label>
                <p className="text-sm text-muted-foreground">
                  Send emergency message as text message
                </p>
              </div>
              <Switch
                checked={sendSMS}
                onCheckedChange={setSendSMS}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Send via WhatsApp</Label>
                <p className="text-sm text-muted-foreground">
                  Send emergency message through WhatsApp
                </p>
              </div>
              <Switch
                checked={sendWhatsApp}
                onCheckedChange={setSendWhatsApp}
              />
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <Button onClick={saveSettings} className="w-full" size="lg">
          <Save className="h-5 w-5 mr-2" />
          Save Settings
        </Button>
      </div>
    </div>
  );
};

export default Settings;