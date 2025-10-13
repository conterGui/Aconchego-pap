import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Users, Clock, User, CheckCircle, XCircle } from "lucide-react";
import HeaderAdmin from "@/components/HeaderAdmin";

interface Table {
  id: number;
  capacity: number;
  reserved: boolean;
  clientName?: string;
  time?: string;
  x: number;
  y: number;
  shape: "square" | "round";
  rotation?: number;
}

export default function MapReservation() {
  const [tables, setTables] = useState<Table[]>([
    { id: 1, capacity: 2, reserved: false, x: 15, y: 20, shape: "round" },
    { id: 2, capacity: 2, reserved: false, x: 30, y: 20, shape: "round" },
    {
      id: 3,
      capacity: 4,
      reserved: false,
      x: 50,
      y: 18,
      shape: "square",
      rotation: 0,
    },
    {
      id: 4,
      capacity: 4,
      reserved: false,
      x: 70,
      y: 18,
      shape: "square",
      rotation: 0,
    },
    { id: 5, capacity: 2, reserved: false, x: 85, y: 20, shape: "round" },

    {
      id: 6,
      capacity: 4,
      reserved: false,
      x: 15,
      y: 45,
      shape: "square",
      rotation: 90,
    },
    {
      id: 7,
      capacity: 6,
      reserved: false,
      x: 35,
      y: 45,
      shape: "square",
      rotation: 0,
    },
    {
      id: 8,
      capacity: 6,
      reserved: false,
      x: 60,
      y: 45,
      shape: "square",
      rotation: 0,
    },
    {
      id: 9,
      capacity: 4,
      reserved: false,
      x: 85,
      y: 45,
      shape: "square",
      rotation: 90,
    },

    { id: 10, capacity: 2, reserved: false, x: 20, y: 70, shape: "round" },
    {
      id: 11,
      capacity: 4,
      reserved: false,
      x: 40,
      y: 72,
      shape: "square",
      rotation: 0,
    },
    {
      id: 12,
      capacity: 4,
      reserved: false,
      x: 60,
      y: 72,
      shape: "square",
      rotation: 0,
    },
    { id: 13, capacity: 2, reserved: false, x: 80, y: 70, shape: "round" },
  ]);

  const [clientName, setClientName] = useState<string>("");
  const [people, setPeople] = useState<number>(2);
  const [time, setTime] = useState<string>("");
  const [selectedTable, setSelectedTable] = useState<number | null>(null);

  const reserveTable = () => {
    if (!clientName || !time) {
      alert("Por favor, preencha todos os campos!");
      return;
    }

    const availableTables = tables.filter(
      (t) => !t.reserved && t.capacity >= people
    );

    if (availableTables.length === 0) {
      alert("Não há mesas disponíveis para este número de pessoas!");
      return;
    }

    const chosenTable = availableTables.reduce((prev, curr) =>
      curr.capacity < prev.capacity ? curr : prev
    );

    const updatedTables = tables.map((t) =>
      t.id === chosenTable.id ? { ...t, reserved: true, clientName, time } : t
    );
    setTables(updatedTables);

    setClientName("");
    setPeople(2);
    setTime("");
    setSelectedTable(chosenTable.id);
  };

  const cancelReservation = (tableId: number) => {
    const updatedTables = tables.map((t) =>
      t.id === tableId
        ? { ...t, reserved: false, clientName: undefined, time: undefined }
        : t
    );
    setTables(updatedTables);
    setSelectedTable(null);
  };

  const availableCount = tables.filter((t) => !t.reserved).length;
  const reservedCount = tables.filter((t) => t.reserved).length;

  const renderChairs = (table: Table) => {
    const isRound = table.shape === "round";
    const chairSize = 14;
    const tableRadius = isRound ? 35 : 45;

    if (isRound) {
      return (
        <>
          <div
            className="absolute bg-gradient-to-b from-amber-800 to-amber-900 rounded-t-lg shadow-md border border-amber-950"
            style={{
              width: `${chairSize}px`,
              height: `${chairSize}px`,
              top: `-${tableRadius + 8}px`,
              left: "50%",
              transform: "translateX(-50%)",
            }}
          />

          <div
            className="absolute bg-gradient-to-b from-amber-800 to-amber-900 rounded-b-lg shadow-md border border-amber-950"
            style={{
              width: `${chairSize}px`,
              height: `${chairSize}px`,
              bottom: `-${tableRadius + 8}px`,
              left: "50%",
              transform: "translateX(-50%)",
            }}
          />
        </>
      );
    } else {
      const rotation = table.rotation || 0;
      const isVertical = rotation === 90;

      return (
        <>
          <div
            className="absolute bg-gradient-to-b from-amber-800 to-amber-900 rounded shadow-md border border-amber-950"
            style={{
              width: `${chairSize}px`,
              height: `${chairSize}px`,
              [isVertical ? "left" : "top"]: `-${tableRadius - 5}px`,
              [isVertical ? "top" : "left"]: "25%",
              transform: isVertical ? "translateY(-50%)" : "translateX(-50%)",
            }}
          />
          <div
            className="absolute bg-gradient-to-b from-amber-800 to-amber-900 rounded shadow-md border border-amber-950"
            style={{
              width: `${chairSize}px`,
              height: `${chairSize}px`,
              [isVertical ? "left" : "top"]: `-${tableRadius - 5}px`,
              [isVertical ? "top" : "left"]: "75%",
              transform: isVertical ? "translateY(-50%)" : "translateX(-50%)",
            }}
          />
          <div
            className="absolute bg-gradient-to-b from-amber-800 to-amber-900 rounded shadow-md border border-amber-950"
            style={{
              width: `${chairSize}px`,
              height: `${chairSize}px`,
              [isVertical ? "right" : "bottom"]: `-${tableRadius - 5}px`,
              [isVertical ? "top" : "left"]: "25%",
              transform: isVertical ? "translateY(-50%)" : "translateX(-50%)",
            }}
          />
          <div
            className="absolute bg-gradient-to-b from-amber-800 to-amber-900 rounded shadow-md border border-amber-950"
            style={{
              width: `${chairSize}px`,
              height: `${chairSize}px`,
              [isVertical ? "right" : "bottom"]: `-${tableRadius - 5}px`,
              [isVertical ? "top" : "left"]: "75%",
              transform: isVertical ? "translateY(-50%)" : "translateX(-50%)",
            }}
          />
        </>
      );
    }
  };

  return (
    <div className="min-h-screen bg-background from-slate-50 to-slate-100 p-6 mt-16">
      <HeaderAdmin />
      <div className="max-w-7xl mx-auto space-y-6">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Gerenciamento de Reservas
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-card rounded-xl shadow-sm p-5 border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Total de Mesas</p>
                <p className="text-3xl font-bold mt-1">{tables.length}</p>
              </div>
              <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-card rounded-xl shadow-sm p-5 border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-700 font-medium">
                  Disponíveis
                </p>
                <p className="text-3xl font-bold text-green-600 mt-1">
                  {availableCount}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-card rounded-xl shadow-sm p-5 border border-red-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-red-700 font-medium">Reservadas</p>
                <p className="text-3xl font-bold text-red-600 mt-1">
                  {reservedCount}
                </p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <div className="bg-card rounded-2xl shadow-sm p-6 border border-slate-200 sticky top-6">
              <h2 className="text-xl font-bold mb-4">Nova Reserva</h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-foreground font-medium flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Nome do Cliente
                  </Label>
                  <Input
                    value={clientName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setClientName(e.target.value)
                    }
                    placeholder="Digite o nome"
                    className="border-slate-300 focus:border-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label className=" font-medium flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Número de Pessoas
                  </Label>
                  <Input
                    type="number"
                    min={1}
                    max={10}
                    value={people}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setPeople(parseInt(e.target.value) || 1)
                    }
                    className="border-slate-300 focus:border-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="font-medium flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Horário
                  </Label>
                  <Input
                    type="time"
                    value={time}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setTime(e.target.value)
                    }
                    className="border-slate-300 focus:border-blue-500"
                  />
                </div>

                <Button
                  onClick={reserveTable}
                  className="w-full bg-blue-600 hover:bg-blue-700 font-medium py-6 text-base"
                >
                  Reservar Mesa Automaticamente
                </Button>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-200">
                <p className="text-sm font-medium mb-3">Legenda:</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-card border-4 border-emerald-500 shadow-lg flex items-center justify-center">
                      <span className="text-xs font-bold text-emerald-700">
                        2
                      </span>
                    </div>
                    <span className="text-sm">Mesa Disponível</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-card border-4 border-red-500 shadow-lg flex items-center justify-center">
                      <span className="text-xs font-bold text-red-700">Eu</span>
                    </div>
                    <span className="text-sm">Mesa Reservada</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mapa do restaurante */}
          <div className="lg:col-span-2">
            <div className="bg-card rounded-2xl shadow-sm p-6 border border-slate-200">
              <h2 className="text-xl font-bold mb-4">
                Planta do Restaurante (Vista Aérea)
              </h2>

              <div
                className="relative w-full h-[700px] rounded-xl border-2 border-slate-300 overflow-hidden shadow-inner"
                style={{
                  background:
                    "linear-gradient(135deg, #f5f3ef 0%, #e8e4dc 50%, #f5f3ef 100%)",
                }}
              >
                {/* Paredes */}
                <div className="absolute inset-0 border-8 border-slate-700 pointer-events-none"></div>

                {/* Entrada - Porta dupla */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-28 h-2 bg-slate-300 z-10"></div>
                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 flex gap-1">
                  <div className="w-14 h-8 bg-gradient-to-b from-amber-700 to-amber-800 border-2 border-amber-900 rounded-b-lg shadow-lg"></div>
                  <div className="w-14 h-8 bg-gradient-to-b from-amber-700 to-amber-800 border-2 border-amber-900 rounded-b-lg shadow-lg"></div>
                </div>
                <div className="absolute top-10 left-1/2 transform -translate-x-1/2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Entrada
                </div>

                {/* Janelas laterais */}
                <div className="absolute left-0 top-1/4 w-2 h-32 bg-gradient-to-r from-sky-200 to-sky-300 border-y-2 border-sky-400 opacity-70"></div>
                <div className="absolute left-0 top-1/2 w-2 h-32 bg-gradient-to-r from-sky-200 to-sky-300 border-y-2 border-sky-400 opacity-70"></div>
                <div className="absolute right-0 top-1/4 w-2 h-32 bg-gradient-to-l from-sky-200 to-sky-300 border-y-2 border-sky-400 opacity-70"></div>
                <div className="absolute right-0 top-1/2 w-2 h-32 bg-gradient-to-l from-sky-200 to-sky-300 border-y-2 border-sky-400 opacity-70"></div>

                {/* Bar/Área de serviço */}
                <div
                  className="absolute bottom-8 right-8 w-48 h-32 rounded-lg shadow-2xl z-20"
                  style={{
                    background:
                      "linear-gradient(135deg, #1e293b 0%, #334155 50%, #475569 100%)",
                  }}
                >
                  <div className="absolute inset-0 border-4 border-slate-600 rounded-lg"></div>
                  <div className="h-full flex flex-col items-center justify-center text-card">
                    <div className="text-sm font-bold tracking-wider mb-1">
                      BAR
                    </div>
                    <div className="text-xs opacity-75">& COZINHA</div>
                  </div>
                  {/* Balcão do bar */}
                  <div className="absolute -left-6 top-1/2 transform -translate-y-1/2 w-6 h-24 bg-gradient-to-r from-amber-700 to-amber-800 border-2 border-amber-900 rounded-l-lg"></div>
                </div>

                {/* Plantas decorativas */}
                <div className="absolute top-12 left-8">
                  <div className="w-10 h-10 rounded-full bg-green-700 shadow-lg"></div>
                  <div className="absolute top-0 left-0 w-10 h-10 rounded-full bg-green-600 opacity-70 animate-pulse"></div>
                </div>
                <div className="absolute top-12 right-8">
                  <div className="w-10 h-10 rounded-full bg-green-700 shadow-lg"></div>
                  <div className="absolute top-0 left-0 w-10 h-10 rounded-full bg-green-600 opacity-70 animate-pulse"></div>
                </div>
                <div className="absolute bottom-44 left-8">
                  <div className="w-10 h-10 rounded-full bg-green-700 shadow-lg"></div>
                  <div className="absolute top-0 left-0 w-10 h-10 rounded-full bg-green-600 opacity-70 animate-pulse"></div>
                </div>

                {/* Tapete central */}
                <div
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4 h-2/3 rounded-lg opacity-20"
                  style={{
                    background:
                      "repeating-linear-gradient(45deg, #8b5cf6, #8b5cf6 10px, #a78bfa 10px, #a78bfa 20px)",
                  }}
                ></div>

                {/* Mesas com cadeiras */}
                {tables.map((table) => {
                  const isRound = table.shape === "round";
                  const size = isRound ? 70 : 90;

                  return (
                    <div
                      key={table.id}
                      onClick={() => setSelectedTable(table.id)}
                      className="absolute cursor-pointer transition-all duration-300 z-10"
                      style={{
                        left: `${table.x}%`,
                        top: `${table.y}%`,
                        width: `${size}px`,
                        height: `${size}px`,
                        transform: `translate(-50%, -50%) ${
                          selectedTable === table.id ? "scale(1.1)" : "scale(1)"
                        }`,
                      }}
                    >
                      {/* Cadeiras */}
                      {renderChairs(table)}

                      {/* Mesa */}
                      <div
                        className={`absolute inset-0 shadow-2xl transition-all duration-300
                          ${isRound ? "rounded-full" : "rounded-lg"}
                          ${
                            selectedTable === table.id
                              ? "ring-4 ring-blue-500 ring-offset-2"
                              : ""
                          }`}
                        style={{
                          background: table.reserved
                            ? "linear-gradient(135deg, #fee2e2 0%, #fecaca 50%, #fca5a5 100%)"
                            : "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 50%, #bbf7d0 100%)",
                          boxShadow:
                            "0 8px 20px rgba(0,0,0,0.15), inset 0 2px 4px rgba(255,255,255,0.5)",
                        }}
                      >
                        {/* Borda da mesa */}
                        <div
                          className={`absolute inset-0 border-4 ${
                            isRound ? "rounded-full" : "rounded-lg"
                          }`}
                          style={{
                            borderColor: table.reserved ? "#dc2626" : "#16a34a",
                          }}
                        ></div>

                        {/* Sombra interna da mesa */}
                        <div
                          className={`absolute inset-2 ${
                            isRound ? "rounded-full" : "rounded-lg"
                          } opacity-20`}
                          style={{
                            background:
                              "radial-gradient(circle at 30% 30%, transparent 0%, rgba(0,0,0,0.1) 100%)",
                          }}
                        ></div>

                        {/* Conteúdo */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <div
                            className={`text-xs font-bold mb-1 ${
                              table.reserved ? "text-red-800" : "text-green-800"
                            }`}
                          >
                            {table.reserved
                              ? table.clientName?.substring(0, 6)
                              : `Mesa ${table.id}`}
                          </div>
                          <div
                            className={`text-[10px] ${
                              table.reserved ? "text-red-700" : "text-green-700"
                            }`}
                          >
                            {table.reserved
                              ? table.time
                              : `${table.capacity} pessoas`}
                          </div>
                        </div>

                        {/* Badge capacidade */}
                        <div
                          className={`absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold shadow-lg border-2
                          ${
                            table.reserved
                              ? "bg-red-600 text-card border-red-700"
                              : "bg-green-600 text-card border-green-700"
                          }`}
                        >
                          {table.capacity}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Detalhes da mesa */}
              {selectedTable && (
                <div className="mt-4 p-5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-200 shadow-sm">
                  {(() => {
                    const table = tables.find((t) => t.id === selectedTable);
                    if (!table) return null;
                    return (
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-bold text-lg text-slate-800">
                              Mesa #{table.id}
                            </h3>
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${
                                table.reserved
                                  ? "bg-red-100 text-red-700 border border-red-300"
                                  : "bg-emerald-100 text-emerald-700 border border-emerald-300"
                              }`}
                            >
                              {table.reserved ? "Reservada" : "Disponível"}
                            </span>
                          </div>

                          <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2 text-slate-600">
                              <Users className="w-4 h-4" />
                              <span>
                                Capacidade:{" "}
                                <strong>{table.capacity} pessoas</strong>
                              </span>
                            </div>

                            {table.reserved && (
                              <>
                                <div className="flex items-center gap-2 text-slate-700">
                                  <User className="w-4 h-4" />
                                  <span>
                                    Cliente: <strong>{table.clientName}</strong>
                                  </span>
                                </div>
                                <div className="flex items-center gap-2 text-slate-700">
                                  <Clock className="w-4 h-4" />
                                  <span>
                                    Horário: <strong>{table.time}</strong>
                                  </span>
                                </div>
                              </>
                            )}

                            <div className="flex items-center gap-2 text-slate-600">
                              <span>
                                Formato:{" "}
                                <strong>
                                  {table.shape === "round"
                                    ? "Redonda"
                                    : "Retangular"}
                                </strong>
                              </span>
                            </div>
                          </div>
                        </div>

                        {table.reserved && (
                          <Button
                            onClick={() => cancelReservation(table.id)}
                            variant="outline"
                            className="ml-4 border-red-300 text-red-600 hover:bg-red-50 font-medium"
                          >
                            Cancelar Reserva
                          </Button>
                        )}
                      </div>
                    );
                  })()}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
