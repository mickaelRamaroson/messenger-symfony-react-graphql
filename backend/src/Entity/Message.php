<?php

namespace App\Entity;

use App\Repository\MessageRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: MessageRepository::class)]
class Message
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(["message"])]
    private ?int $id = null;


    #[ORM\ManyToOne(inversedBy: 'messages')]
    #[Groups(["message"])]
    private ?User $user = null;

    #[ORM\Column(type: Types::TEXT)]
    #[Groups(["message"])]
    private ?string $content = null;

    #[ORM\Column(nullable: true)]
    #[Groups(["message"])]
    private ?bool $isRead = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE, nullable: true)]
    #[Groups(["message"])]
    private ?\DateTimeInterface $readAt = null;

    #[ORM\ManyToOne(inversedBy: 'message')]
    private ?Thread $thread = null;

    #[Groups(["message"])]
    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private $createdAt;


    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }

    public function getContent(): ?string
    {
        return $this->content;
    }

    public function setContent(string $content): self
    {
        $this->content = $content;

        return $this;
    }

    public function isIsRead(): ?bool
    {
        return $this->isRead;
    }

    public function setIsRead(?bool $isRead): self
    {
        $this->isRead = $isRead;

        return $this;
    }

    public function getReadAt(): ?\DateTimeInterface
    {
        return $this->readAt;
    }

    public function setReadAt(?\DateTimeInterface $readAt): self
    {
        $this->readAt = $readAt;

        return $this;
    }

    public function getThread(): ?Thread
    {
        return $this->thread;
    }

    public function setThread(?Thread $thread): self
    {
        $this->thread = $thread;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->createdAt;
    }

    public function setCreatedAt(?\DateTimeInterface $timestamp): self
    {
        $this->createdAt = $timestamp;
        return $this;
    }
}