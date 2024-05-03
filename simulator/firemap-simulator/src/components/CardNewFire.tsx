import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/utils/ui.util";
import axios from "axios";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";

type CardNewFireProps = {
  sensorId: number;
  onCancel: () => void;
};

const CardNewFire = ({ sensorId, onCancel }: CardNewFireProps) => {
  const [intensity, setIntensity] = useState(1);

  const handleIntensityChange = (value: number[]) => {
    setIntensity(value[0]);
  };

  const handleCreateFire = async () => {
    const payload = {
      sensor: {
        id: sensorId,
        intensity: intensity,
      },
    };
    try {
      const response = await axios.post("/api/event", payload);
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Erreur lors de la requête à votre API", error);
    }
    onCancel();
    //reload
  };

  return (
    <Card
      className={cn(
        "w-[380px] absolute bottom-0 left-1/2 transform -translate-x-1/2 z-50"
      )}
    >
      <CardHeader>
        <CardTitle>Nouveau feu</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex items-center space-x-4 rounded-md border p-4">
          <div className="flex-1 space-y-1">
            <p className="text-sm text-muted-foreground">
              Intensité: {intensity}
            </p>
          </div>
          <Slider
            max={9}
            min={1}
            step={1}
            defaultValue={[1]}
            onValueChange={handleIntensityChange}
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-around">
        <Button onClick={onCancel}>Annuler</Button>
        <Button className="bg-red-600 text-white" onClick={handleCreateFire}>
          Déclencher un incendie
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CardNewFire;
