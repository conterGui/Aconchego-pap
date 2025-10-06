import React, { useState } from "react";
import { MenuItem, menuItems } from "@/pages/data/menuData";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import HeaderAdmin from "@/components/HeaderAdmin";

export default function MenuAdmin() {
  const [items, setItems] = useState<MenuItem[]>(menuItems);
  const [search, setSearch] = useState("");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);

  // Estados do formulário
  const [formData, setFormData] = useState<Omit<MenuItem, "id">>({
    name: "",
    price: 0,
    description: "",
    category: "",
    image: "",
    isSpecial: false,
    allergens: [],
  });

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = () => {
    const newItem: MenuItem = {
      id: Date.now(),
      ...formData,
    };
    setItems((prev) => [...prev, newItem]);
    setFormData({
      name: "",
      price: 0,
      description: "",
      category: "",
      image: "",
      isSpecial: false,
      allergens: [],
    });
    setIsAddOpen(false);
  };

  const handleDelete = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleEdit = (item: MenuItem) => {
    setEditingItem(item);
    setFormData({ ...item });
    setIsEditOpen(true);
  };

  const handleSaveEdit = () => {
    if (!editingItem) return;
    setItems((prev) =>
      prev.map((item) =>
        item.id === editingItem.id ? { ...editingItem, ...formData } : item
      )
    );
    setEditingItem(null);
    setIsEditOpen(false);
  };

  return (
    <div className="p-6">
      <HeaderAdmin />
      {/* Header */}
      <div className="flex justify-between items-center mb-6 mt-12">
        <h1 className="text-2xl font-semibold">Gerenciamento de Stock</h1>

        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Produto
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Novo Produto</DialogTitle>
            </DialogHeader>

            <StockForm
              formData={formData}
              setFormData={setFormData}
              onSubmit={handleAdd}
              onCancel={() => setIsAddOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Pesquisa */}
      <div className="flex items-center gap-2 mb-6">
        <Search className="w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Pesquisar produto..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
      </div>

      {/* Lista de produtos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <Card key={item.id} className="overflow-hidden">
            <CardHeader className="p-0">
              {item.image && (
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-40 object-cover"
                />
              )}
            </CardHeader>
            <CardContent className="p-4 space-y-2">
              <CardTitle className="flex justify-between items-center">
                <span>{item.name}</span>
                {item.isSpecial && (
                  <span className="text-xs bg-yellow-200 text-yellow-800 px-2 py-0.5 rounded">
                    Especial
                  </span>
                )}
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                {item.description}
              </p>
              <p className="text-sm font-semibold">{item.price.toFixed(2)} €</p>
              <p className="text-xs text-muted-foreground capitalize">
                Categoria: {item.category}
              </p>

              <div className="flex justify-end gap-2 pt-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleEdit(item)}
                >
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => handleDelete(item.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Modal de edição */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Produto</DialogTitle>
          </DialogHeader>

          <StockForm
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleSaveEdit}
            onCancel={() => setIsEditOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

/* 🧩 Componente de Formulário Reutilizável */
interface StockFormProps {
  formData: Omit<MenuItem, "id">;
  setFormData: React.Dispatch<React.SetStateAction<Omit<MenuItem, "id">>>;
  onSubmit: () => void;
  onCancel: () => void;
}

function StockForm({
  formData,
  setFormData,
  onSubmit,
  onCancel,
}: StockFormProps) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="space-y-4"
    >
      <div className="space-y-2">
        <Label>Nome</Label>
        <Input
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Nome do produto"
          required
        />
      </div>

      <div className="space-y-2">
        <Label>Preço (€)</Label>
        <Input
          type="number"
          value={formData.price}
          onChange={(e) =>
            setFormData({ ...formData, price: parseFloat(e.target.value) })
          }
          required
        />
      </div>

      <div className="space-y-2">
        <Label>Descrição</Label>
        <Textarea
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          placeholder="Descreve o produto..."
          required
        />
      </div>

      <div className="space-y-2">
        <Label>Categoria</Label>
        <Input
          value={formData.category}
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
          }
          placeholder="cafes, doces, bebidas..."
          required
        />
      </div>

      <div className="space-y-2">
        <Label>Imagem (URL)</Label>
        <Input
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          placeholder="/menu/expresso.png"
        />
      </div>

      <DialogFooter className="flex justify-end gap-2 pt-2">
        <Button variant="outline" type="button" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">Salvar</Button>
      </DialogFooter>
    </form>
  );
}
